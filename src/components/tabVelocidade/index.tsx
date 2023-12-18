import { useContext, useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { HistoricoContext } from '../../contexts/historicoContext';
import { spanProps } from '../../pages/Home';
import TabSemDados from '../tabSemDados';

export default function TabVelocidade() {
    const { listaHistorico } = useContext(HistoricoContext)
    const [velocidadeMedia, setVelocidadeMedia] = useState(0.00)

    useEffect(() => {
        setVelocidadeMedia(listaHistorico.reduce((acc, cur) => acc + cur.palavras_por_minuto, 0) / listaHistorico.length)
    }, [listaHistorico])

    function TooltipFunc({ active, payload, label }: any) {
        if (active) {
            const texto = JSON.parse(payload[0].payload.texto) as spanProps[];
            // setTextoHistorico(texto);
            const numero_acertos = Number(payload[0].payload.numero_acertos);
            const numero_erros = Number(payload[0].payload.numero_erros);
            const numero_correcoes = Number(payload[0].payload.numero_correcoes);
            const sum = (numero_acertos + numero_erros);
            const precisao = sum == 0 ? 0 : (numero_acertos / sum) * 100;

            return (
                <div className="text-white whitespace-nowrap bg-slate-600 rounded  px-4  py-2 m-1 text-sm font-medium">
                    <div className='flex flex-col items-left'>
                        <div className='flex'>
                            <p className='text-lime-500'>{numero_acertos}</p> /
                            <p className='text-red-400'>{numero_erros}</p> /
                            <p className='text-amber-500'>{numero_correcoes}</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='bg-red-500 h-2 w-full rounded overflow-hidden mr-2'>
                                <div className='bg-lime-500' style={{
                                    width: `${precisao}%`,
                                    height: '8px'
                                }}></div>
                            </div>
                            <p className='text-lime-500'>{precisao.toFixed(2).replace('.00', '')}%</p>
                        </div>
                    </div>
                    {/* <p>tempo: {60 - texto.tempoRestante}s</p> */}
                    <p>Velocidade: {((sum / 5) * 1).toFixed(2).replace('.00', '')} ppm</p>
                </div>
            );
        }
        return null;
    }

    return (
        <div>
            {listaHistorico.length > 0 ?
                <div className='flex flex-col w-full h-48'>
                    <p className='flex gap-1'>Velocidade média: <p className='font-medium'>{velocidadeMedia > 0 ? velocidadeMedia.toFixed(2).replace('.00', '') : 0.00} ppm</p></p>
                    <ResponsiveContainer>
                        <LineChart data={listaHistorico}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip content={<TooltipFunc />}></Tooltip>
                            <Line type="monotone"
                                dataKey="palavras_por_minuto"
                                stroke='white'
                                animationDuration={500}
                                dot={{ strokeWidth: 0, r: 3, fill: 'white' }}
                            ></Line>
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
                :
                <TabSemDados />
            }
        </div>
    )
}
