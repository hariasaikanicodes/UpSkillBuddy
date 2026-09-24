import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GenAIApp from './GenAIApp.jsx'
import './genai.css'

createRoot(document.getElementById('genai-root')).render(
  <StrictMode>
    <GenAIApp />
  </StrictMode>,
)
