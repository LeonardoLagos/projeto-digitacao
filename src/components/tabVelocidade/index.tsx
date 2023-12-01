import { useContext, useEffect } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { HistoricoContext } from '../../contexts/historicoContext';
import { spanProps } from '../../pages/Home';
import { api } from '../../services/api';



export default function TabVelocidade() {
    const { listaHistorico } = useContext(HistoricoContext)

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
        <div>
            <div className='flex w-full h-48'>
                <ResponsiveContainer>
                    <LineChart data={listaHistorico}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip content={<PpmTooltip />}></Tooltip>
                        <Line type="monotone"
                            dataKey="palavras_por_minuto"
                            stroke='white'
                            animationDuration={500}
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
        </div>
    )
}
