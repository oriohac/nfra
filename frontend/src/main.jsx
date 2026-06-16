import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import { ProfileProvider } from './context/profilecontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileProvider>
    <App />
    </ProfileProvider>
    <ToastContainer position="top-right" />
  </StrictMode>,
)
