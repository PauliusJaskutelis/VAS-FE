import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
} from '@mui/material';
import SchemaIcon from '@mui/icons-material/Schema';
import SettingsIcon from '@mui/icons-material/Settings';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  onSettingsClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSettingsClick }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AppBar position="static" elevation={5}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'background.paper',
          gap: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            VAS
          </Typography>
        </Box>

        <ListItemButton component={Link} to="/" selected={currentPath === '/'}>
          <ListItemIcon>
            <ImageSearchIcon />
          </ListItemIcon>
          <ListItemText primary="Classify Images" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/modelStorage"
          selected={currentPath === '/modelStorage'}
        >
          <ListItemIcon>
            <SchemaIcon />
          </ListItemIcon>
          <ListItemText primary="Model Storage" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/imageStorage"
          selected={currentPath === '/imageStorage'}
        >
          <ListItemIcon>
            <PhotoLibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Image Storage" />
        </ListItemButton>
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
