import { Box } from '@mui/system';
import ImageUploader from '../components/ImageUploader';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <ImageUploader />
    </Box>
  );
};

export default Home;
