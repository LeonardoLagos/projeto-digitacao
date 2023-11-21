import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import Header from './components/Header/Header'
import Cadastro from './pages/cadastro'
import PaginaPerfil from './pages/paginaPerfil'

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
    }
])

export default router
