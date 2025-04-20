import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [status, setStatus] = useState<'success' | 'error'>('success');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const passwordGuide = (password: string): string[] => {
    const issues: string[] = [];

    if (password.length < 8) {
      issues.push('• Must be at least 8 characters long');
    }

    if (!/[a-z]/.test(password)) {
      issues.push('• Must include at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
      issues.push('• Must include at least one uppercase letter');
    }

    if (!/[0-9]/.test(password)) {
      issues.push('• Must include at least one number');
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      issues.push('• Must include at least one special character (e.g. !@#$%)');
    }

    return issues;
  };

  useEffect(() => {
    setIsValidPassword(
      password === confirmationPassword &&
        password.length > 8 &&
        confirmationPassword.length > 8
    );
  }, [password, confirmationPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await registerUser(email, password);
      setStatus('success');
      setMessage('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setStatus('error');
      setMessage('Registration failed. Try again.');
    } finally {
      setLoading(false);
      setSnackOpen(true);
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
        Create an Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
        />

        {passwordGuide(password).map((msg, index) => (
          <Typography key={index} variant="body2" color="error">
            {msg}
          </Typography>
        ))}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
          disabled={!isValidPassword || loading}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            'Register'
          )}
        </Button>

        <Typography variant="body2" align="center" my={2}>
          OR
        </Typography>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(
              'Google register token:',
              credentialResponse.credential
            );
            // TODO: Send to backend for account creation or login
          }}
          onError={() => {
            console.log('Google Register Failed');
          }}
        />

        <Typography variant="body2" align="center" mt={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </form>

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

export default Register;
