import { useState } from 'react';
import { Box } from '@mui/system';
import ImageUploader from '../components/ImageUploader';
import Navigation from '../components/Navigation';
import Settings from '../components/Settings';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const handleUploadSuccess = (data: any) => {
    navigate('/results', {
      state: {
        results: data.results,
        imagePreview: data.imageBase64 ?? null,
      },
    });
  };
  return (
    <>
      <Navigation onSettingsClick={() => setSettingsOpen(true)} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)', //adjust for Navigation height
          backgroundColor: 'background.default',
        }}
      >
        <ImageUploader onUploadSuccess={handleUploadSuccess} />
      </Box>
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default Home;
