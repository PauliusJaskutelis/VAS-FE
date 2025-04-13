// components/ModelDetails.tsx
import React from 'react';
import { Box, Typography, Divider, Chip } from '@mui/material';
import { ModelCardProps } from './ModelCard';

interface ModelDetailsProps {
  model: ModelCardProps | null;
}

const statusColors: Record<
  string,
  'success' | 'error' | 'warning' | 'default'
> = {
  ready: 'success',
  error: 'error',
  extracting: 'warning',
};

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
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Model Details
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold">
        Name:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {model.name}
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold">
        Input Shape:
      </Typography>
      <Typography variant="body1" gutterBottom>
        [{model.inputShape?.join(', ')}]
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold">
        Status:
      </Typography>
      <Chip
        label={model.status}
        color={statusColors[model.status] || 'default'}
      />
    </Box>
  );
};

export default ModelDetails;
