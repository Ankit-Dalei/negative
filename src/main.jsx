import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  RouterProvider
} from "react-router";
import routes from './components/routers/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
