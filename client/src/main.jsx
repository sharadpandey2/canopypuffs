import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// IMPORT BOTH FILES HERE
import './index.css'
import './App.css'  // <--- Make sure this line exists!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)