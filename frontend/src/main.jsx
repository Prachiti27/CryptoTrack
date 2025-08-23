import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import CoinContextProvider from './Context/coinContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CoinContextProvider>
      <App />
    </CoinContextProvider>
  </BrowserRouter>
)
