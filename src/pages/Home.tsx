import { Box } from '@mui/system';
import ImageUploader from '../components/ImageUploader';
import Navigation from '../components/Navigation';

const Home = () => {
  return (
    <>
      <Navigation />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)', //adjust for Navigation height
        }}
      >
        <ImageUploader />
      </Box>
    </>
  );
};

export default Home;
