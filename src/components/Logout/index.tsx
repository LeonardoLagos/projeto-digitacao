import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext, Usuario } from '../../contexts/userContext'

export default function Logout() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        localStorage.removeItem('token')
        setUser({} as Usuario)
        navigate('/')
    }, [])
    return (
        <div></div>
    )
}
