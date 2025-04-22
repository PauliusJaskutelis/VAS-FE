import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImageCardProps {
  imageId: string;
  filename?: string;
  onDelete?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageId,
  filename,
  onDelete,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:8080/api/images/${imageId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl); // cleanup
      } catch (err) {
        console.error(`❌ Failed to load image preview:`, err);
      }
    };

    fetchImage();
  }, [imageId]);

  return (
    <Card sx={{ width: 140, position: 'relative' }}>
      <CardMedia
        component="img"
        height="120"
        image={previewUrl ?? ''}
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
