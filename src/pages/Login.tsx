import Card from '@mui/material/Card';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleOAuth } from '../services/OAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [status, setStatus] = useState<'success' | 'error'>('success');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.token);
      setStatus('success');
      setMessage('Login successful!');
      setSnackOpen(true);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setMessage('Invalid email or password.');
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        backgroundColor: 'background.paper',
        boxShadow: 6,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
      </Button>

      <Typography variant="body2" align="center" my={2}>
        OR
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => {
          const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
          const redirectUri = 'http://localhost:5173/oauth2/callback';
          const scope = 'email profile openid';
          const responseType = 'code';

          const googleOAuthUrl =
            `https://accounts.google.com/o/oauth2/v2/auth` +
            `?client_id=${clientId}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=${responseType}` +
            `&scope=${encodeURIComponent(scope)}` +
            `&access_type=offline` +
            `&prompt=consent`;
          console.log('uri: ', googleOAuthUrl);

          window.location.href = googleOAuthUrl;
        }}
      >
        Continue with Google
      </Button>

      <Typography variant="body2" align="center" mt={2}>
        Don’t have an account? <Link to="/register">Register</Link>
      </Typography>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity={status} onClose={() => setSnackOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Login;
