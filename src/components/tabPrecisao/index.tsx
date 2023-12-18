import { useContext, useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Cell, LabelList, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { HistoricoContext } from '../../contexts/historicoContext';
import TabSemDados from '../tabSemDados';

interface precisaoGeral {
    contagem: number,
    tipo: string,
    precisao: string
}

export default function TabPrecisao() {
    const { listaHistorico } = useContext(HistoricoContext)
    const [precisaoGeral, setPrecisaoGeral] = useState<precisaoGeral[]>([] as precisaoGeral[])
    const [precisaoReal, setPrecisaoReal] = useState<precisaoGeral[]>([] as precisaoGeral[])
    // const [selectionRange, setSelectionRange] = useState({
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     key: 'selection',
    // })

    useEffect(() => {
        const listaPrecisaoGeral = [] as precisaoGeral[]
        const listaPrecisaoReal = [] as precisaoGeral[]

        const erros = listaHistorico.reduce((acc, cur) => acc + cur.numero_erros, 0)
        const correcoes = listaHistorico.reduce((acc, cur) => acc + cur.numero_correcoes, 0)
        const acertos = listaHistorico.reduce((acc, cur) => acc + cur.numero_acertos, 0)
        const acertosReal = acertos + correcoes
        const precisaoGeral = (acertos / (erros + acertos + correcoes) * 100).toFixed(2).replace('.00', '') + '%'
        const precisaoReal = (acertosReal / (acertosReal + erros) * 100).toFixed(2).replace('.00', '') + '%'

        listaPrecisaoGeral.push({
            contagem: erros,
            tipo: 'erros',
            precisao: precisaoGeral
        })
        listaPrecisaoGeral.push({
            contagem: acertos,
            tipo: 'acertos',
            precisao: precisaoGeral
        })
        listaPrecisaoGeral.push({
            contagem: correcoes,
            tipo: 'correcoes',
            precisao: precisaoGeral
        })

        setPrecisaoGeral(listaPrecisaoGeral)

        listaPrecisaoReal.push({
            contagem: erros,
            tipo: 'erros',
            precisao: precisaoReal
        })

        listaPrecisaoReal.push({
            contagem: acertosReal,
            tipo: 'acertos',
            precisao: precisaoReal
        })

        setPrecisaoReal(listaPrecisaoReal)
    }, [listaHistorico])

    return (
        <div>
            {listaHistorico.length > 0 ?
                <div>
                    < div className='flex w-full h-60 '>
                        {/* <div className='w-2/4 h-96'>
                                <DateRangePickerComp />
                            </div> */}
                        <div className='flex flex-col w-2/4 h-60 items-center'>
                            <p className='font-medium'>Precisão Geral: </p>
                            <ResponsiveContainer width={'100%'}>
                                <PieChart>
                                    <Pie data={precisaoGeral}
                                        innerRadius={50}
                                        outerRadius={70}
                                        dataKey="contagem"
                                        label={{ fontSize: '16px' }}
                                        labelLine={true}
                                        animationDuration={300}
                                        className='outline-none'
                                    >
                                        {
                                            precisaoGeral.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? 'rgb(248 113 113)' :
                                                    index === 1 ? 'rgb(132 204 22)' : 'rgb(245 158 11)'} />
                                            ))
                                        }
                                        <LabelList dataKey={'precisao'} fill='rgb(132 204 22)' stroke='transparent' fontSize={'18px'} position={'center'} />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='flex flex-col w-2/4 h-60 items-center'>
                            <p className='font-medium'>Precisão Real: </p>
                            <ResponsiveContainer width={'100%'}>
                                <PieChart>
                                    <Pie data={precisaoReal}
                                        innerRadius={50}
                                        outerRadius={70}
                                        dataKey="contagem"
                                        label={{ fontSize: '16px' }}
                                        labelLine={true}
                                        animationDuration={300}
                                        className='outline-none'
                                    >
                                        {
                                            precisaoReal.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? 'rgb(248 113 113)' : 'rgb(132 204 22)'} />
                                            ))
                                        }
                                        <LabelList dataKey={'precisao'} fill='rgb(132 204 22)' stroke='transparent' fontSize={'18px'} position={'center'} />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>


                    <div className='flex w-full h-40 z-0'>
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
                                            <div className='text-amber-500'>{payload[2].value}</div>
                                        </div>
                                }}></Tooltip>
                                <Line type="monotone"
                                    dataKey="numero_acertos"
                                    stroke='rgb(132 204 22)'
                                    animationDuration={500}
                                    dot={{ strokeWidth: 0, r: 3, fill: 'rgb(132 204 22)' }}
                                ></Line>
                                <Line type="monotone"
                                    dataKey="numero_erros"
                                    stroke='rgb(220 38 38)'
                                    animationDuration={500}
                                    dot={{ strokeWidth: 0, r: 3, fill: 'rgb(220 38 38)' }}
                                ></Line>
                                <Line type="monotone"
                                    dataKey="numero_correcoes"
                                    stroke='rgb(245 158 11)'
                                    animationDuration={500}
                                    dot={{ strokeWidth: 0, r: 3, fill: 'rgb(245 158 11)' }}
                                ></Line>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                :
                <TabSemDados />
            }
        </div >
    )
}
