import { createBrowserRouter } from 'react-router-dom'
import Header from './components/header'
import Logout from './components/logout'
import Home from './pages/Home'
import Cadastro from './pages/cadastro'
import Dashboard from './pages/dashboard'
import Login from './pages/login'

const router = createBrowserRouter([
    {
        element: <Header></Header>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/cadastro',
        element: <Cadastro></Cadastro>
    },
    {
        path: '/logout',
        element: <Logout></Logout>
    }
])

export default router
