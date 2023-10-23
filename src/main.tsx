import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Question from './components/Question.tsx';
import Levels from './components/Levels.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/levels" />,
  },
  {
    index: true,
    path: '/levels',
    element: <Levels />,
  },
  {
    path: '/questions/:number',
    element: <Question />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
