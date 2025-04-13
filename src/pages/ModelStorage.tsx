import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import ModelList from '../components/ModelStorageComponents/ModelList';
import ModelDetails from '../components/ModelStorageComponents/ModelDetails';
import { ModelCardProps } from '../components/ModelStorageComponents/ModelCard';
import Navigation from '../components/Navigation';
import Settings from '../components/Settings';

const ModelStoragePage = () => {
  const [selectedModel, setSelectedModel] = useState<ModelCardProps | null>(
    null
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Navigation onSettingsClick={() => setSettingsOpen(true)} />
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <Box sx={{ height: '100vh', display: 'flex' }}>
        <Grid container>
          {/* Left pane: Detailed model view */}
          <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #444' }}>
            <ModelDetails model={selectedModel} />
          </Grid>

          {/* Right pane: List of models */}
          <Grid item xs={12} md={8}>
            <ModelList onSelect={setSelectedModel} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ModelStoragePage;
