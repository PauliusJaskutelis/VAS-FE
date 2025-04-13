import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Model from './pages/Model'; // Import the ModelUpload component

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* removes browser default spacing */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Home />} />{' '}
          {/* Redirect to Home for any other route */}
          <Route path="/model" element={<Model />} />{' '}
          {/* Add ModelUpload route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
