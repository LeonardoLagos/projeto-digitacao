import { useContext, useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { HistoricoContext } from '../../contexts/historicoContext';
import { cardTexto } from '../../pages/dashboard';
import FundoParaSobreposicao from '../fundoParaSobreposicao';
import ModalInfoCompleto from '../modalInfoCompleto';
import TabSemDados from '../tabSemDados';

export default function TabVelocidade() {
    const { listaHistorico } = useContext(HistoricoContext)
    const [velocidadeMedia, setVelocidadeMedia] = useState(0.00)
    const [modalVisivel, setModalVisivel] = useState(false)
    const [InfoModal, setInfoModal] = useState<cardTexto>()

    useEffect(() => {
        setVelocidadeMedia(listaHistorico.reduce((acc, cur) => acc + cur.palavras_por_minuto, 0) / listaHistorico.length)
    }, [listaHistorico])

    function TooltipFunc({ active, payload, label }: any) {
        if (active) {
            const numero_acertos = Number(payload[0].payload.numero_acertos);
            const numero_erros = Number(payload[0].payload.numero_erros);
            const numero_correcoes = Number(payload[0].payload.numero_correcoes);
            const sum = (numero_acertos + numero_erros + numero_correcoes);
            const porcentagemAcertos = sum == 0 ? 0 : (numero_acertos / sum) * 100;
            const porcentagemCorrecoes = sum == 0 ? 0 : (numero_correcoes / sum) * 100;

            return (
                <div className="text-white whitespace-nowrap bg-slate-600 rounded  px-4  py-2 m-1 text-sm font-medium">
                    <div className='flex flex-col items-left'>
                        <div className='flex'>
                            <p className='text-lime-500'>{numero_acertos}</p> /
                            <p className='text-red-400'>{numero_erros}</p> /
                            <p className='text-amber-500'>{numero_correcoes}</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='flex bg-red-500 h-2 w-full rounded overflow-hidden mx-2'>
                                <div className='bg-lime-500' style={{
                                    width: `${porcentagemAcertos}%`,
                                    height: '8px'
                                }}></div>
                                <div className='bg-amber-500' style={{
                                    width: `${porcentagemCorrecoes}%`,
                                    height: '8px'
                                }}></div>
                            </div>
                            <p className='text-lime-500'>{porcentagemAcertos.toFixed(2).replace('.00', '')}%</p>
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
            {
                InfoModal &&
                <FundoParaSobreposicao modalVisivel={modalVisivel} setModalVisivel={setModalVisivel}>
                    <ModalInfoCompleto informacoesModal={InfoModal} />
                </FundoParaSobreposicao>
            }
            {listaHistorico.length > 0 ?
                <div className='flex flex-col w-full h-48'>
                    <p className='flex gap-1'>Velocidade média: <p className='font-medium'>{velocidadeMedia > 0 ? velocidadeMedia.toFixed(2).replace('.00', '') : 0.00} ppm</p></p>
                    <ResponsiveContainer>
                        <LineChart
                            data={listaHistorico}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                            onClick={(e: any) => {
                                const info = e.activePayload[0].payload as cardTexto
                                setInfoModal(info)
                                setModalVisivel(true)
                            }}
                        >
                            <XAxis dataKey="data_resumida" />
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


                </div>
                :
                <TabSemDados />
            }
        </div>
    )
}
