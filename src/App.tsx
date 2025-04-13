import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './pages/Results';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* removes browser default spacing */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes here */}
          {/* Example: <Route path="/register" element={<Register />} /> */}
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
