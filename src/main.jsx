import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MockAuthProvider } from './contexts/MockAuthContext.jsx'
import './index.css'

// Using Mock Authentication - No Supabase Required
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MockAuthProvider>
      <App />
    </MockAuthProvider>
  </React.StrictMode>
)
