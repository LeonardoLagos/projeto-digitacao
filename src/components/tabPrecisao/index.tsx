import { useContext, useEffect, useState } from 'react'
import { Cell, Label, LabelList, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { HistoricoContext } from '../../contexts/historicoContext'

interface precisaoGeral {
    contagem: number,
    tipo: string,
    precisao: string
}

export default function TabPrecisao() {
    const { listaHistorico } = useContext(HistoricoContext)
    const [precisaoGeral, setPrecisaoGeral] = useState<precisaoGeral[]>([] as precisaoGeral[])
    useEffect(() => {
        const listaPrecisaoGeral = [] as precisaoGeral[]
        const erros = listaHistorico.reduce((acc, cur) => acc + cur.numero_erros, 0)
        const acertos = listaHistorico.reduce((acc, cur) => acc + cur.numero_acertos, 0)
        listaPrecisaoGeral.push({
            contagem: erros,
            tipo: 'erros',
            precisao: (acertos / (erros + acertos) * 100).toFixed(2) + '%'
        })
        listaPrecisaoGeral.push({
            contagem: listaHistorico.reduce((acc, cur) => acc + cur.numero_acertos, 0),
            tipo: 'acertos',
            precisao: (acertos / (erros + acertos) * 100).toFixed(2) + '%'
        })
        setPrecisaoGeral(listaPrecisaoGeral)
    }, [])

    return (
        <div>
            <div className='flex w-full h-40 '>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={precisaoGeral}
                            dataKey="contagem"
                            label={{ fontSize: '16px' }}
                            labelLine={true}
                            animationDuration={300}
                            className='outline-none'
                        >
                            {
                                precisaoGeral.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'rgb(248 113 113)' : 'rgb(132 204 22)'} />
                                ))
                            }
                            <LabelList dataKey={'precisao'} fill='black' fontSize={'60px'} />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

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
