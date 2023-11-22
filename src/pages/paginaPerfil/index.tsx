import React, { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'

export default function PaginaPerfil() {
  const { user } = useContext(UserContext)

  return (
    <div className='text-white'>
      <h1>Nome: {user.nome}</h1>
      <h1>E-mail: {user.email}</h1>
      <img src={user.fotoPerfil} alt="" />
    </div>
  )
}
