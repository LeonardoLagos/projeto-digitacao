import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './App.tsx'
import MuiStyleProvider from './contexts/muiStyleContext.tsx'
import './index.css'
import { UserContext, UserProvider } from './contexts/userContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <MuiStyleProvider>
      <RouterProvider router={router} />
    </MuiStyleProvider>
  </UserProvider>
  //</React.StrictMode>
)
