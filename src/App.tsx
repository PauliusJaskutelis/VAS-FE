import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './pages/Results';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Login from './pages/Login';
import Home from './pages/Home';
import ModelStoragePage from './pages/ModelStorage';
import Register from './pages/Register';
import OAuthCallback from './pages/OAuthCallback';
import ImageStoragePage from './pages/ImageStorage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* removes browser default spacing */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add other routes here */}
          {/* Example: <Route path="/register" element={<Register />} /> */}
          <Route path="/oauth2/callback" element={<OAuthCallback />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Home />} />{' '}
          {/* Redirect to Home for any other route */}
          <Route path="/modelStorage" element={<ModelStoragePage />} />{' '}
          <Route path='/imageStorage' element={<ImageStoragePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
