import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/router'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <>
  <ToastContainer />
    <Router />
  </>,
)
