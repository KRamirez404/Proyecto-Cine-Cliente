import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import createRouter from './router';

// TODO: Replace with real auth store (Zustand)
// For now, check localStorage for user (from Login page)
const storedUser = localStorage.getItem('user');
const mockUser = storedUser ? JSON.parse(storedUser) : null;
// Set to null to test auth pages, or uncomment below for testing with logged-in user:
// const mockUser = {
//   name: 'Usuario Demo',
//   email: 'demo@cineapp.com',
//   role: 'customer', // Change to 'admin' or 'cajero' for testing different layouts
// };

const router = createRouter(mockUser);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
