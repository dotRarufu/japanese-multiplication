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
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Start from './components/Start.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/levels',
    element: <Levels />,
  },

  {
    // todo: add guard if category and level is unlocked
    path: '/questions/:category/:number',
    element: (
      <ProtectedRoute redirectPath={'/levels'} children={<Question />} />
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
