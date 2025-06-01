import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Slider,
  Divider,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';

interface SettingsProps {
  open: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ open, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
        <FormControlLabel
          control={
            <Switch
              checked={settings.describeWithLLM}
              onChange={(e) =>
                updateSettings({ describeWithLLM: e.target.checked })
              }
              color="primary"
            />
          }
          label="Describe with LLM"
        />
      </Box>
      <Divider />

      <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
        Logout
      </Button>
    </Drawer>
  );
};

export default Settings;
