import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import Header from './components/Header'
import Cadastro from './pages/cadastro'
import PaginaPerfil from './pages/paginaPerfil'
import Logout from './components/Logout'

const router = createBrowserRouter([
    {
        element: <Header></Header>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/paginaPerfil',
                element: <PaginaPerfil></PaginaPerfil>
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
