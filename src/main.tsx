import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './App.tsx'
import HeaderProvider from './contexts/HeaderContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <HeaderProvider>
      <RouterProvider router={router} />
    </HeaderProvider>
  //</React.StrictMode>
)
