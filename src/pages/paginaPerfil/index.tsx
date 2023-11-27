import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import { spanProps } from '../Home'
import { api } from '../../services/api'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
export interface cardTexto {
  texto: spanProps[],
  numero_acertos: number,
  numero_erros: number,
  tempo_total: number,
  palavras_por_minuto: number,
  data: Date | null
}

export default function PaginaPerfil() {
  const [listaHistorico, setListaHistorico] = useState<cardTexto[]>([] as cardTexto[])
  const { user } = useContext(UserContext)

  useEffect(() => {
    api.get('/historico', {
      timeout: 3000,
      params: {
        id_usuario: user.id
      }
    })
      .then((validation) => {
        console.log(validation.data)
        setListaHistorico(validation.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user.id])

  return (
    <div className='text-white'>
      <h1>Nome: {user.nome}</h1>
      <h1>E-mail: {user.email}</h1>
      <img src={user.fotoPerfil} alt="" />
      <div className='flex w-full h-64 justify-center'>
        <ResponsiveContainer width={'90%'} >
          <LineChart data={listaHistorico}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="data" />
            <YAxis />
            <Legend></Legend>
            <Tooltip></Tooltip>
            <Line type="monotone" dataKey="palavras_por_minuto"></Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
