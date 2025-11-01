import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App2D from './App2D.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App2D />
  </StrictMode>,
)
