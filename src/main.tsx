import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SettingsProvider } from './context/SettingsContext.tsx';
import { ResultsProvider } from './context/ResultsContext.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SettingsProvider>
        <ResultsProvider>
          <App />
        </ResultsProvider>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>
);
