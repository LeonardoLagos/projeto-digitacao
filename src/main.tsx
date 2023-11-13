import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './App.tsx'
import MuiStyleProvider from './contexts/muiStyleContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <MuiStyleProvider>
    <RouterProvider router={router} />
  </MuiStyleProvider>
  //</React.StrictMode>
)
