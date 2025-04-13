// components/ModelList.tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ModelCard, { ModelCardProps } from './ModelCard';
import EmptyState from './EmptyState';

interface ModelListProps {
  onSelect: (model: ModelCardProps) => void;
}

const mockModels: ModelCardProps[] = [
  {
    id: '1',
    name: 'mnist_model.h5',
    inputShape: [28, 28],
    status: 'ready',
  },
  {
    id: '2',
    name: 'resnet_classifier.keras',
    inputShape: [224, 224, 3],
    status: 'extracting',
  },
  {
    id: '3',
    name: 'experimental_model.h5',
    inputShape: [64, 64, 3],
    status: 'error',
  },
];

const ModelList: React.FC<ModelListProps> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (model: ModelCardProps) => {
    setSelectedId(model.id);
    onSelect(model);
  };

  return (
    <Box p={3} sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <Typography variant="h6" mb={2}>
        Uploaded Models
      </Typography>

      {mockModels.length > 0 ? (
        mockModels.map((model) => (
          <ModelCard
            key={model.id}
            {...model}
            selected={model.id === selectedId}
            onClick={() => handleSelect(model)}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </Box>
  );
};

export default ModelList;
