import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { uploadModel } from '../../services/api';
import { ModelMetadata } from '../../types';
import { v4 as UUID } from 'uuid';

interface ModelUploadProps {
  open: boolean;
  onClose: () => void;
  onModelUpload: (model: ModelMetadata) => void; // Callback to update the model list
}

const ModelUpload: React.FC<ModelUploadProps> = ({
  open,
  onClose,
  onModelUpload,
}) => {
  const [modelName, setModelName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'success' | 'error'>('success');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleUpload = async () => {
    if (!modelName || !file) {
      setStatus('error');
      setMessage('Please fill in all fields.');
      setSnackOpen(true);
      return;
    }

    const modelId = UUID();

    onClose();
    onModelUpload({
      id: modelId,
      filename: modelName,
      status: 'EXTRACTING',
      inputWidth: 0,
      inputHeight: 0,
      inputShape: '',
      colorMode: '',
      preprocessing: '',
      storagePath: '',
    });
    try {
      const res = await uploadModel(file, modelName, modelId);
      onModelUpload(res);
    } catch (error: any) {
      console.error('Upload error:', error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Upload a Model
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ p: 1 }}>
            <Card variant="outlined">
              <CardContent>
                <TextField
                  fullWidth
                  label="Model Name"
                  variant="outlined"
                  margin="normal"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />

                <InputLabel sx={{ mt: 2, mb: 1 }}>
                  Model File (.h5, .keras)
                </InputLabel>
                <Button variant="outlined" component="label">
                  Choose File
                  <input
                    type="file"
                    hidden
                    accept=".h5,.keras"
                    onChange={handleFileChange}
                    data-testid="file-input"
                  />
                </Button>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {file ? file.name : 'No file selected'}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity={status} onClose={() => setSnackOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModelUpload;
