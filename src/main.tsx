import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import './index.css';
import '@mantine/core/styles.css';
import { App } from './App';
import { AuthProvider } from './providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>,
);
