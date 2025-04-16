// components/ModelList.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ModelCard from './ModelCard';
import { ModelMetadata } from '../../types';

interface ModelListProps {
  models: ModelMetadata[];
  onSelect: (model: ModelMetadata) => void;
  onUploadClick: (uploadModalOpen: boolean) => void;
}

const ModelList: React.FC<ModelListProps> = ({
  models,
  onSelect,
  onUploadClick,
}) => {
  if (models.length === 0) {
    return (
      <Box p={3}>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onUploadClick(true)}
          >
            Upload New Model
          </Button>
        </Box>
        <Typography>No models found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      sx={{ height: 'calc(100vh - 64px)' }}
      gap={2}
    >
      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onUploadClick(true)}
        >
          Upload New Model
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          scrollbarColor: '#555 #333',
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // <-- keeps consistent spacing
          pr: 1, // optional: prevents scrollbars from cutting into content
        }}
      >
        {[...models].reverse().map((model) => (
          <Box key={model.id} sx={{ flexShrink: 0 }}>
            <ModelCard model={model} onClick={() => onSelect(model)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ModelList;
