import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { HistoricoContext } from '../../contexts/historicoContext'
import { spanProps } from '../../pages/Home'

export default function TabPrecisao() {
    const navigate = useNavigate()
    const { listaHistorico } = useContext(HistoricoContext)
    useEffect(() => {
        if (localStorage.getItem('token') == null)
            navigate('/')
    }, [])

    useEffect(() => {
        if (listaHistorico.length === 0) return

        listaHistorico.forEach((item) => {
            JSON.parse(item.texto as unknown as string).forEach((letra: spanProps) => {
                if (letra.className.includes('erro')) {
                }
            })

            console.log(item)
        })
    }, [listaHistorico])

    return (
        <div>
            <div className='flex w-full h-40'>
                <ResponsiveContainer >
                    <LineChart data={listaHistorico}
                        margin={{ top: 20, right: 30 }}>
                        <XAxis dataKey="data" />
                        <YAxis />
                        {/* <Legend></Legend> */}
                        <Tooltip content={({ active, payload, label }: any) => {
                            if (active)
                                return <div>
                                    <div className='text-lime-500'>{payload[0].value}</div>
                                    <div className='text-red-400'>{payload[1].value}</div>
                                </div>
                        }}></Tooltip>
                        <Line type="monotone"
                            dataKey="numero_acertos"
                            stroke='rgb(132 204 22)'
                            animationDuration={500}
                        ></Line>
                        <Line type="monotone"
                            dataKey="numero_erros"
                            stroke='rgb(220 38 38)'
                            animationDuration={500}
                        ></Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
