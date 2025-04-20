// components/EmptyState.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const EmptyState: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        color: 'text.secondary',
      }}
    >
      <CloudUploadIcon sx={{ fontSize: 64, mb: 2 }} />
      <Typography variant="h6">No models uploaded</Typography>
      <Typography variant="body2">
        Start by uploading a model to view its status and details.
      </Typography>
    </Box>
  );
};

export default EmptyState;
