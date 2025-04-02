import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Slider,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSettings } from '../context/SettingsContext';

interface SettingsProps {
  open: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ open, onClose }) => {
  const { settings, updateSettings } = useSettings();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{ width: 300, p: 3, height: '100%', bgcolor: 'background.paper' }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography gutterBottom>
          Predictions: {settings.predictionCount}
        </Typography>
        <Slider
          value={settings.predictionCount}
          onChange={(_, value) =>
            updateSettings({ predictionCount: value as number })
          }
          min={1}
          max={10}
          step={1}
        />

        <Typography gutterBottom sx={{ mt: 3 }}>
          Confidence Threshold: {settings.confidenceThreshold.toFixed(2)}
        </Typography>
        <Slider
          value={settings.confidenceThreshold}
          onChange={(_, value) =>
            updateSettings({ confidenceThreshold: value as number })
          }
          min={0}
          max={1.0}
          step={0.01}
        />
      </Box>
    </Drawer>
  );
};

export default Settings;
