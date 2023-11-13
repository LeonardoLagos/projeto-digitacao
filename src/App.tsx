import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import Header from './components/Header/Header'

const router = createBrowserRouter([
    {
        element: <Header></Header>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    }
])

export default router
