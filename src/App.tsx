import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import ModelStoragePage from './pages/ModelStorage';

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
          <Route path="/modelStorage" element={<ModelStoragePage />} />{' '}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
