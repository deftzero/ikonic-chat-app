import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// CSS
import './index.css'

// Pages
import Index from './pages/Index.tsx'
import { Room } from './pages/Room.tsx';
import { Private } from './pages/Private.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/room/:id",
    element: <Room />,
  },
  {
    path: "/private/:id",
    element: <Private />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
