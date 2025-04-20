import React from 'react';
import { IconButton, Typography, Card, CardMedia, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImageCardProps {
  imageUrl: string;
  filename?: string;
  onDelete?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, filename, onDelete }) => {
  return (
    <Card sx={{ width: 140, position: 'relative' }}>
      <CardMedia
        component="img"
        height="120"
        image={imageUrl}
        alt={filename ?? 'Uploaded Image'}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant="caption" noWrap>
          {filename}
        </Typography>
      </CardContent>

      {onDelete && (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'rgba(0,0,0,0.4)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255,0,0,0.6)' },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Card>
  );
};

export default ImageCard;
