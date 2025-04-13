import Card from '@mui/material/Card';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GoogleIcon from '../resources/GoogleIcon.webp';

const Login = () => {
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
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2, backgroundColor: 'white', color: 'black' }}
      >
        Login
      </Button>

      <Typography variant="body2" align="center" my={2}>
        OR
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<img src={GoogleIcon} alt="" width="29" />}
      >
        Login with Google
      </Button>

      <Typography variant="body2" align="center" mt={2}>
        Don’t have an account? <Link to="/register">Register</Link>
      </Typography>
    </Card>
  );
};

export default Login;
