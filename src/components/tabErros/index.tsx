import React, { useContext, useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { UserContext } from '../../contexts/userContext'
import { api } from '../../services/api'


interface contagemErros {
  numero_erros: number,
  caracter: string
}

export default function TabErros() {
  const [listaErros, setListaErros] = useState<contagemErros[]>([] as contagemErros[])
  const { user } = useContext(UserContext)

  useEffect(() => {
    api.get('/erros', {
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

  return (
    <div>
      <div className='flex w-full h-60 justify-start'>
        <ResponsiveContainer>
          <BarChart width={400} height={400} data={listaErros.sort((a, b) => a.numero_erros - b.numero_erros).reverse()}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <YAxis></YAxis>
            {/* <Tooltip content={({ active, payload, label }: any) => {
              if (active)
                return <div className='text-slate-50'>{payload[0].value}</div>
            }}
            cursor={false}
            ></Tooltip> */}
            <XAxis dataKey={"caracter"} ></XAxis>
            <Bar dataKey={"numero_erros"} fill='rgb(220 38 38)' >
              <LabelList
                dataKey={"numero_erros"}
                position="insideTop"
                style={{ fontSize: '80%', fill: 'white', textAnchor: 'middle' }}>
              </LabelList>
            </Bar>
            {/* <Pie
            data={listaErros.sort((a => a.numero_erros))}
            dataKey="numero_erros"
            nameKey="caracter"
            label={{ fontSize: '16px' }}
            labelLine={true}
            >
            {
              listaErros.sort((a => a.numero_erros)).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'rgb(220 38 38)' : 'rgb(0 0 0)'} style={{ outline: 'none' }} />
                ))
              }
              <LabelList dataKey="caracter" position="inside" />
            </Pie> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
