import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import createRouter from './router';

// TODO: Replace with real auth store (Zustand)
// For now, check localStorage for user (from Login page)
const storedUser = localStorage.getItem('user');

// Si no hay usuario en localStorage, usar uno por defecto para desarrollo
const mockUser = storedUser 
  ? JSON.parse(storedUser) 
  : null; // null permite acceso a páginas públicas (login, register, cartelera)

// Para testing de páginas protegidas SIN login, descomenta:
// const mockUser = {
//   name: 'Admin Demo',
//   email: 'admin@cineapp.com',
//   role: 'admin', // Cambia a 'customer', 'admin', o 'cajero'
// };

const router = createRouter(mockUser);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
