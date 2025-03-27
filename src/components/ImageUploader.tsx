import React, { useEffect, useState } from 'react';
import { AiOutlineCloudUpload, AiOutlineCheckCircle } from 'react-icons/ai';
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
} from '@mui/material';
import './image-uploader.css';

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
      const res = await uploadImage(file);
      setMessage('Įkėlimas sėkmingas!');
      setStatus('success');
      if (onUploadSuccess) onUploadSuccess(res.data);
    } catch (e) {
      console.error(e);
      setMessage('Įkėlimas nepavyko.');
      setStatus('error');
    } finally {
      setLoading(false);
      setSnackOpen(true);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, p: 3, boxShadow: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Įkelkite vaizdą
        </Typography>

        <div
          className="document-uploader"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{ width: width, height: height }}
        >
          <div className="upload-info">
            <AiOutlineCloudUpload />
            <div>
              <p>Vilkite failą arba pasirinkite naršyklėje</p>
              <p style={{ fontSize: '0.8rem' }}>
                Palaikomi formatai: .png, .jpg, .jpeg (maks. 15MB)
              </p>
            </div>
          </div>

          <input
            type="file"
            hidden
            id="browse"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
          <label htmlFor="browse" className="browse-btn">
            Pasirinkti failą
          </label>
        </div>

        {file && (
          <>
            <Box mt={2} className="file-item">
              <p>{file.name}</p>
              <MdClear onClick={handleRemoveFile} />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpload}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Įkelti'
              )}
            </Button>
          </>
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
