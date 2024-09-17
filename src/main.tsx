import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { MantineProvider } from '@mantine/core';
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
