import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, UserContext } from '../../contexts/userContext'

export default function Logout() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('id_usuario')
        setUser({} as User)
        navigate('/')
    }, [])
    return (
        <div></div>
    )
}
