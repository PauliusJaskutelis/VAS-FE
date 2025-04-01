import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavigationProps {
  onSettingsClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSettingsClick }) => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          VAS
        </Typography>

        <IconButton edge="end" color="inherit" onClick={onSettingsClick}>
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
