import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './App.tsx'
import { HistoricoProvider } from './contexts/historicoContext.tsx'
import MuiStyleProvider from './contexts/muiStyleContext.tsx'
import { UserProvider } from './contexts/userContext.tsx'
import './index.css'
import { ToastProvider } from './contexts/ToastContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <ToastProvider>
      <HistoricoProvider>
        <MuiStyleProvider>
          <RouterProvider router={router} />
        </MuiStyleProvider>
      </HistoricoProvider>
    </ToastProvider>
  </UserProvider>
  //</React.StrictMode>
)
