import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavigationProps {
  onSettingsClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSettingsClick }) => {
  return (
    <AppBar position="static" elevation={5}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6" component="div">
          VAS
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onSettingsClick}
          aria-label="settings"
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
