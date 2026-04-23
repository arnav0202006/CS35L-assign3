import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import Board from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Board />
  </StrictMode>
)
