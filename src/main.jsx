import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  RouterProvider
} from "react-router";
import routes from './components/routers/Routes.jsx';
import { UserContextProvider } from './contestApi/UserContextProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </UserContextProvider>
  </StrictMode>,
)
