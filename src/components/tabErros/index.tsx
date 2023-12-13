import React, { useContext, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { UserContext } from '../../contexts/userContext'
import { api } from '../../services/api'
import { set } from 'date-fns'
import { spanProps } from '../../pages/Home'


interface contagemErros {
  caracter: string,
  numero_erros: number,
  numero_acertos: number,
  porcentagem_erros: number,
  porcentagem_acertos: number,
  label: string
}

export default function TabErros() {
  const [listaErros, setListaErros] = useState<contagemErros[]>([] as contagemErros[])
  const { user } = useContext(UserContext)

  useEffect(() => {
    api.get('/historico/teclas', {
      timeout: 3000,
      params: {
        id_usuario: user.id
      },
    })
      .then((validation) => {
        setListaErros(validation.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [user.id])

  function TooltipFunc({ active, payload, label }: any) {
    if (active) {
      const numero_acertos = Number(payload[0].payload.numero_acertos);
      const numero_erros = Number(payload[0].payload.numero_erros);

      return (
        <div className="text-white whitespace-nowrap bg-slate-600 rounded px-1 text-sm font-medium">
          <div className='flex flex-col items-left'>
            <div className='flex'>
              <p className='text-lime-500'>{numero_acertos}</p>/<p className='text-red-400'>{numero_erros}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <div className='flex w-full h-60 justify-start'>
        <ResponsiveContainer>
          <BarChart data={listaErros.filter(x => x.porcentagem_erros >= 10).sort((a, b) => a.porcentagem_erros - b.porcentagem_erros).reverse()}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <YAxis dataKey={"porcentagem_erros"} allowDecimals={true} ></YAxis>
            <XAxis dataKey={"caracter"} ></XAxis>
            <Tooltip content={<TooltipFunc />} cursor={false}></Tooltip>
            <Bar dataKey={"porcentagem_erros"} fill='rgb(220 38 38)' >

              <LabelList
                dataKey={"label"}
                position="insideTop"
                style={{ fontSize: '80%', fill: 'white', textAnchor: 'middle', fontWeight: 'bold' }}>
              </LabelList>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
