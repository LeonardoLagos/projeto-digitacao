import { useContext } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { HistoricoContext } from '../../contexts/historicoContext'
import { UserContext } from '../../contexts/userContext'
import TabSemDados from '../tabSemDados'

export default function TabErros() {
  const { listaErros } = useContext(HistoricoContext)

  function TooltipFunc({ active, payload, label }: any) {
    try {
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
    } catch (err) {
      return null;
    }
  }

  return (
    <div>
      {listaErros.length > 0 ?
        <div className='flex w-full h-60 justify-start'>
          <ResponsiveContainer>
            <BarChart data={listaErros.filter(x => x.porcentagem_erros > 0).sort((a, b) => a.porcentagem_erros - b.porcentagem_erros).reverse().slice(0, 15)}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <YAxis dataKey={"porcentagem_erros"} allowDecimals={true} ></YAxis>
              <XAxis dataKey={"caracter"} ></XAxis>
              <Tooltip content={<TooltipFunc />} cursor={false} ></Tooltip>
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
        :
        <TabSemDados />
      }
    </div>
  )
}
