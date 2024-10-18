import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { isConfigValid } from './firebase/config';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (!isConfigValid) {
  console.warn('Firebase configuration is invalid. Application is running in demo mode.');
}