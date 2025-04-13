import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { uploadModel } from '../services/api';

const ModelUpload: React.FC = () => {
  const [modelName, setModelName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
    try {
      const result = await uploadModel(file, modelName);
      setMessage(`Model uploaded! ID: ${result.model_id || 'unknown'}`);
      setStatus('success');
    } catch (error: any) {
      console.error('Upload error:', error);
      setMessage(error?.response?.data?.message || 'Failed to upload model.');
      setStatus('error');
    } finally {
      setLoading(false);
      setSnackOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Upload a Model
          </Typography>

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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Upload'
            )}
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity={status} onClose={() => setSnackOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ModelUpload;
