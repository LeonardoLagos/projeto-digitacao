import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import { spanProps } from '../Home'
import { api } from '../../services/api'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export interface cardTexto {
  texto: spanProps[],
  numero_acertos: number,
  numero_erros: number,
  tempo_total: number,
  palavras_por_minuto: number,
  data: Date | null
}

export default function PaginaPerfil() {
  const navigate = useNavigate()
  const [listaHistorico, setListaHistorico] = useState<cardTexto[]>([] as cardTexto[])
  const [textoHistorico, setTextoHistorico] = useState<spanProps[]>([] as spanProps[])
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('token') == null)
      navigate('/')
  }, [])

  useEffect(() => {
    api.get('/historico', {
      timeout: 3000,
      params: {
        id_usuario: user.id
      }
    })
      .then((validation) => {
        setListaHistorico(validation.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user.id])

  useEffect(() => {
    if (listaHistorico.length === 0) return
    
    listaHistorico.forEach((item) => {
      JSON.parse(item.texto as unknown as string).forEach((letra:spanProps) => {
        if (letra.className.includes('erro')) {
        }
      })
      
      console.log(item)
    })
  }, [listaHistorico])

  function PpmTooltip({ active, payload, label }: any) {
    if (active) {
      const texto = JSON.parse(payload[0].payload.texto) as spanProps[];
      // setTextoHistorico(texto);
      const numero_acertos = Number(payload[0].payload.numero_acertos);
      const numero_erros = Number(payload[0].payload.numero_erros);
      const sum = (numero_acertos + numero_erros);
      const precisao = sum == 0 ? 0 : (numero_acertos / sum) * 100;

      return (
        <div className="text-white whitespace-nowrap bg-slate-600 rounded  px-4  py-2 m-1 text-sm font-medium">
          <div className='flex flex-col items-left'>
            <div className='flex'>
              <p className='text-lime-500'>{numero_acertos}</p>/<p className='text-red-400'>{numero_erros}</p>
            </div>
            <div className='flex items-center'>
              <div className='bg-red-500 h-2 w-full rounded overflow-hidden mr-2'>
                <div className='bg-lime-500' style={{
                  width: `${precisao}%`,
                  height: '8px'
                }}></div>
              </div>
              <p className='text-lime-500'>{precisao.toFixed(2)}%</p>
            </div>
          </div>
          {/* <p>tempo: {60 - texto.tempoRestante}s</p> */}
          <p>Velocidade: {((sum / 5) * 1).toFixed(2)} ppm</p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className='flex flex-col text-white gap-2'>
      <div className='flex mt-4 ml-2 gap-4'>
        <Avatar src={user.fotoPerfil} sx={{ cursor: 'pointer', scale: '1.3' }}></Avatar>
        <div className='flex flex-col'>
          <p className='text-xl font-medium'>{user.nome}</p>
          <p className='text-sm font-light text-slate-300'>{user.email}</p>
        </div>
      </div>


      <div className=''>

      </div>


      <div className='flex w-full h-40'>
        <ResponsiveContainer width={'50%'}>
          <LineChart data={listaHistorico}
            margin={{ top: 20, right: 30 }}>
            <XAxis dataKey="data" />
            <YAxis />
            {/* <Legend></Legend> */}
            <Tooltip content={({ active, payload, label }: any) => {
              if (active)
                return <div className='text-lime-500'>{payload[0].value}</div>
            }}></Tooltip>
            <Line type="monotone" dataKey="numero_acertos" stroke='rgb(132 204 22)'></Line>
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width={'50%'}>
          <LineChart data={listaHistorico}
            margin={{ top: 20, right: 30 }}>
            <XAxis dataKey="data" />
            <YAxis />
            {/* <Legend></Legend> */}
            <Tooltip content={({ active, payload, label }: any) => {
              if (active)
                return <div className='text-red-400'>{payload[0].value}</div>
            }}></Tooltip>
            <Line type="monotone" dataKey="numero_erros" stroke='rgb(220 38 38)'></Line>
          </LineChart>
        </ResponsiveContainer>
      </div>


      <div className='flex w-full h-48 justify-left'>
        <ResponsiveContainer>
          <LineChart data={listaHistorico}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>

            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip content={<PpmTooltip />}></Tooltip>
            <Line type="monotone" dataKey="palavras_por_minuto" stroke='white'></Line>
          </LineChart>
        </ResponsiveContainer>

        {/* <div className="border w-2/5 h-full rounded p-2 text-xl font-medium overflow-auto" >
          {textoHistorico.map((letra, index) => {
            if (letra.children === ' ') {
              return <span className={letra.className + ' inline-block text-center'} style={{ minWidth: '4px', height: '27px' }} key={index}>&nbsp;</span>
            }
            return <span className={letra.className} key={index}>{letra.children}</span>
          })}
        </div> */}
      </div>
    </div>
  )
}
