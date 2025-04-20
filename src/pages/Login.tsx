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
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
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
      await loginUser(email, password);
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

      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential;

          try {
            const res = await googleOAuth(token);

            console.log('✅ Auth success:', res.data);
            // You might want to save the session, redirect, etc.
          } catch (error) {
            console.error('❌ Auth failed:', error);
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />

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
