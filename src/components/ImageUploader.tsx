import React, { useContext, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';
import { uploadImage } from '../services/api';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Typography,
  Box,
  Stack,
  IconButton,
} from '@mui/material';
import './image-uploader.css';
import { useSettings } from '../context/SettingsContext';

interface Props {
  onUploadSuccess?: (result: any) => void;
  width?: string;
  height?: string;
}

const ImageUploader: React.FC<Props> = ({ onUploadSuccess, width, height }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'success' | 'error'>('success');
  const { settings } = useSettings();
  const { predictionCount, confidenceThreshold } = settings;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  const handleRemoveFile = () => setFile(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const res = await uploadImage(file, predictionCount, confidenceThreshold);
      console.log(res);
      setMessage('Successful Upload!');
      setStatus('success');
      if (onUploadSuccess) onUploadSuccess(res.data);
    } catch (e) {
      console.error(e);
      setMessage('Error while uploading.');
      setStatus('error');
    } finally {
      setLoading(false);
      setSnackOpen(true);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        p: 3,
        boxShadow: 5,
        backgroundColor: 'background.paper',
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Upload Image
        </Typography>
        <Box
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          sx={{
            border: '2px dashed',
            borderColor: 'primary.main',
            backgroundColor: '#444',
            borderRadius: 2,
            p: 2,
            mt: 2,
            textAlign: 'center',
            width: width || '100%',
            height: height || 'auto',
          }}
        >
          <AiOutlineCloudUpload size={36} color="" />
          <Typography variant="body1">Drag and Drop or Browse Files</Typography>
          <Typography variant="caption">
            Supported formats: .png, .jpg, .jpeg (max 15MB)
          </Typography>

          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
            color="info"
          >
            Choose a File
            <input
              type="file"
              hidden
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
            />
          </Button>
        </Box>

        {file && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              px: 2,
              py: 1,
              bgcolor: '#444',
            }}
          >
            <Typography variant="body2">{file.name}</Typography>
            <IconButton onClick={handleRemoveFile} color="error">
              <MdClear />
            </IconButton>
          </Stack>
        )}

        {file && (
          <Button
            variant="contained"
            color="info"
            fullWidth
            onClick={handleUpload}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Upload'
            )}
          </Button>
        )}
      </CardContent>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity={status} onClose={() => setSnackOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ImageUploader;
