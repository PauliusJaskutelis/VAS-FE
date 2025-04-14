// components/ModelCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import StatusBadge from './StatusBadge';
import { ModelMetadata } from '../../types';

export interface ModelCardProps {
  model: ModelMetadata;
  onClick?: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        backgroundColor: '#333',
        color: 'white',
        '&:hover': {
          backgroundColor: '#444',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">{model.filename}</Typography>
        <Typography variant="body2">
          Shape: {model.inputWidth}x{model.inputHeight} {model.colorMode}
        </Typography>
        <Box mt={1}>
          <StatusBadge status={model.status} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModelCard;
