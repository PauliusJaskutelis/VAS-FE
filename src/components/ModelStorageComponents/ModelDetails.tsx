// components/ModelDetails.tsx
import React from 'react';
import { Box, Typography, Divider, Chip, Paper, Stack } from '@mui/material';
import { ModelMetadata } from '../../types';
import StatusBadge from './StatusBadge';

interface ModelDetailsProps {
  model: ModelMetadata | null;
}

const ModelDetails: React.FC<ModelDetailsProps> = ({ model }) => {
  if (!model) {
    return (
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Model Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a model from the list to view details.
        </Typography>
      </Box>
    );
  }
  return (
    <Paper
      sx={{ height: '100%', backgroundColor: '#2e2e2e', color: 'white', p: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        {model.filename}
      </Typography>

      <StatusBadge status={model.status} />

      <Divider sx={{ my: 2, borderColor: '#555' }} />

      <Stack spacing={1}>
        <Typography variant="body2">
          <strong>Model ID:</strong> {model.id}
        </Typography>
        <Typography variant="body2">
          <strong>Input Shape:</strong> {model.inputWidth} x {model.inputHeight}
        </Typography>
        <Typography variant="body2">
          <strong>Color Mode:</strong> {model.colorMode}
        </Typography>
        <Typography variant="body2">
          <strong>Preprocessing:</strong> {model.preprocessing}
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
          <strong>Storage Path:</strong> {model.storagePath}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ModelDetails;
