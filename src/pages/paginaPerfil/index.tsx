import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import { spanProps } from '../Home'
import { api } from '../../services/api'

interface cardHistorico {
  texto: spanProps[],
  numero_acertos: number,
  numero_erros: number,
  tempo_total: number,
  data: Date
}

export default function PaginaPerfil() {
  const [listaHistorico, setListaHistorico] = useState<cardHistorico[]>([] as cardHistorico[])
  const { user } = useContext(UserContext)

  useEffect(() => {
    api.get('/historico', {
      timeout: 3000,
      params: {
        id_usuario: '87e72bdf-d5ea-460c-8b1c-ff61876c7e63'
      }
    })
      .then((validation) => {
        console.log(validation.data)
        setListaHistorico(validation.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='text-white'>
      <h1>Nome: {user.nome}</h1>
      <h1>E-mail: {user.email}</h1>
      <img src={user.fotoPerfil} alt="" />

      <div className='flex'>
        {
          listaHistorico.map((texto, index) => {
            let multiplicadorTempo = 1
            const sum = (texto.numero_acertos + texto.numero_erros);
            const precisao = sum == 0 ? 0 : (texto.numero_acertos / sum) * 100;
            return <div className="text-white whitespace-nowrap bg-slate-600 rounded  px-4  py-2 m-1 text-sm font-medium" key={index} onClick={(e) => {
              // setTextoCardAtual(texto)
            }}>
              <div className='flex items-center '>
                <p className='text-lime-500'>{texto.numero_acertos}</p>/<p className='text-red-400'>{texto.numero_erros}</p>
                <div className='bg-red-500 h-2 w-full rounded overflow-hidden mx-2'>
                  <div className='bg-lime-500' style={{
                    width: `${precisao}%`,
                    height: '8px'
                  }}></div>
                </div>
                <p className='text-lime-500'>{precisao.toFixed(2)}%</p>
              </div>
              {/* <p>tempo: {60 - texto.tempoRestante}s</p> */}
              <p>Velocidade: {((sum / 5) * multiplicadorTempo).toFixed(2)} ppm</p>
            </div>
          })
        }
      </div>
      {
        // listaHistorico.map((letra, index) => {
        //   if (letra.children === ' ') {
        //     return <span className={letra.className + ' inline-block text-center'} style={{ minWidth: '4px', height: '27px' }} key={index}>&nbsp;</span>
        //   }
        //   return <span className={letra.className} key={index}>{letra.children}</span>
        // })
      }
    </div>
  )
}
