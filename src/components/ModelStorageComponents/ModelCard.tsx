// components/ModelCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import StatusBadge from './Statusbadge';

export interface ModelCardProps {
  id: string;
  name: string;
  status:
    | 'uploading'
    | 'extracting'
    | 'validating'
    | 'analyzing'
    | 'ready'
    | 'error';
  inputShape?: number[];
  onClick?: () => void;
  selected?: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({
  name,
  status,
  inputShape,
  onClick,
  selected,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        mb: 2,
        cursor: 'pointer',
        backgroundColor: selected ? '#555' : 'background.paper',
        transition: '0.2s ease',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
          <StatusBadge status={status} />
        </Box>

        {inputShape && (
          <Typography variant="caption" color="text.secondary">
            Shape: ({inputShape.join(', ')})
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelCard;
