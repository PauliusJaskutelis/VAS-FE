import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SettingsProvider } from './context/SettingsContext.tsx';
import { ResultsProvider } from './context/ResultsContext.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='739981906150-jam0tlo719vdqs8achdiliq7gb74j9oi.apps.googleusercontent.com'>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SettingsProvider>
        <ResultsProvider>
          <App />
        </ResultsProvider>
      </SettingsProvider>
    </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
