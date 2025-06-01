// OAuthCallback.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleOAuth } from '../services/OAuth';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    const exchangeCodeForToken = async () => {
      try {
        const res = await googleOAuth(code || undefined);
        console.log('code: ', code);
        console.log('data: ', res.data);
        const { token } = res.data;
        console.log('token: ', token);

        localStorage.setItem('token', token);
        navigate('/');
      } catch (error) {
        console.error('OAuth login failed! ', error);
        navigate('/login');
      }
    };
    if (code) exchangeCodeForToken();
    else navigate('/login');
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 400,
          width: '90%',
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" mt={2}>
          Processing login...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please wait while we redirect you back to the application.
        </Typography>
      </Paper>
    </Box>
  );
};

export default OAuthCallback;
