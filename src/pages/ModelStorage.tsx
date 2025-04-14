import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import ModelList from '../components/ModelStorageComponents/ModelList';
import ModelDetails from '../components/ModelStorageComponents/ModelDetails';
import Navigation from '../components/Navigation';
import Settings from '../components/Settings';
import { ModelMetadata } from '../types';
import ModelUpload from '../components/ModelStorageComponents/ModelUpload';
import { connectWebSocket } from '../services/webSocket';
import { fetchModels } from '../services/api';

const ModelStoragePage = () => {
  const [models, setModels] = useState<ModelMetadata[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelMetadata | null>(
    null
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const modelsFromServer = await fetchModels();
        setModels(modelsFromServer);
      } catch (error) {
        console.error('Failed to load models', error);
      }
    };

    loadModels(); // initial fetch

    console.log('WebSocket connection established.');
    const client = connectWebSocket((modelId, status) => {
      setModels((prev) =>
        prev.map((model) =>
          model.id === modelId
            ? { ...model, status: status as ModelMetadata['status'] }
            : model
        )
      );
    });
    return () => {
      console.log('WebSocket connection closed.');
      client.deactivate();
    };
  }, []);

  return (
    <>
      <Navigation onSettingsClick={() => setSettingsOpen(true)} />
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container>
          {/* Left pane: Detailed model view */}
          <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #444' }}>
            <ModelDetails model={selectedModel} />
          </Grid>

          {/* Right pane: List of models */}
          <Grid item xs={12} md={8}>
            <ModelList
              models={models}
              onSelect={setSelectedModel}
              onUploadClick={setUploadModalOpen}
            />
          </Grid>
        </Grid>

        <ModelUpload
          open={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          onModelUpload={(newModel) =>
            setModels((prevModels) => {
              const exists = prevModels.some((m) => m.id === newModel.id);
              return exists
                ? prevModels.map((m) => (m.id === newModel.id ? newModel : m))
                : [...prevModels, newModel];
            })
          }
        />
      </Box>
    </>
  );
};

export default ModelStoragePage;
