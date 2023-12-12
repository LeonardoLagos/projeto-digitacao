import RefreshIcon from '@mui/icons-material/Refresh';
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { api } from '../../services/api';
import { cardTexto } from '../dashboard';

export interface spanProps {
  className: string,
  children: string
}

export default function Home() {
  const { user } = useContext(UserContext)
  const [contagem, setContagem] = useState(0)
  const [listaLetras, setListaLetras] = useState<spanProps[]>([])
  const refDivPalavras = useRef<HTMLDivElement>(null)
  const refInputDigitacao = useRef<HTMLInputElement>(null)
  const [cronometroAtivo, setCronometroAtivo] = useState(false)
  const [cronometro, setCronometro] = useState(60)
  const [textosFinalizados, setTextosFinalizados] = useState<cardTexto[]>([] as cardTexto[])
  const [textoCardAtual, setTextoCardAtual] = useState<cardTexto>()
  const [quantidadeAcertos, setQuantidadeAcertos] = useState(0)
  const [quantidadeErros, setQuantidadeErros] = useState(0)

  const navigate = useNavigate()

  async function preencheTexto() {
    setCronometroAtivo(false)
    const frase = await buscaTexto();
    //listaPalavras[Math.floor(Math.random() * listaPalavras.length)]
    if (frase === undefined) return

    setListaLetras([])
    for (const letra of frase) {
      setListaLetras((prev) => [...prev, { className: '', children: letra }])
    }
    refInputDigitacao.current?.focus()
  }

  async function buscaTexto(): Promise<string> {
    return await api.get('/', {
      timeout: 3000,
      params: {
        quantidade: '10'
      }
    })
      .then((validation) => {
        return validation.data
        // window.location.href = 'http://cerejeiras.wcogeo.com.br:81'//navigate("/dashboard", { replace: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (contagem <= 0) return;
    if (contagem === listaLetras.length) {
      finalizaDigitacao()
    } else {
      setCronometroAtivo(true)
    }
  }, [contagem])

  useEffect(() => {
    buscaTexto()
    preencheTexto()
  }, [])

  useEffect(() => {
    if (!cronometroAtivo) return
    const interval = setInterval(() => {
      setCronometro((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [cronometroAtivo])

  useEffect(() => {
    if (cronometro === 0) {
      finalizaDigitacao()
      setCronometroAtivo(false)
      return
    }
  }, [cronometro])


  function handleApagar(e: React.KeyboardEvent<HTMLInputElement>) {
    const teclaPresionada = e.key
    if (teclaPresionada === 'Backspace') {
      if (contagem === 0) return
      const caractereAnterior = listaLetras[contagem - 1]

      caractereAnterior.className = caractereAnterior.className.replace('bg-lime-600', '')
      caractereAnterior.className = caractereAnterior.className.replace('bg-red-600', '')
      caractereAnterior.className = caractereAnterior.className.replace('bg-amber-500', '')
      setContagem((prev) => prev - 1)
      return
    }
  }

  function handleDigitacao(e: React.ChangeEvent<HTMLInputElement>) {
    const caractereDigitado = e.target.value

    const letraCorreta = listaLetras[contagem]
    if (contagem === listaLetras.length) {
      return
    }

    if (caractereDigitado === letraCorreta.children) {
      setQuantidadeAcertos((prev) => prev + 1)

      if (letraCorreta.className.includes('erro'))
        letraCorreta.className += ' bg-amber-500'
      else
        letraCorreta.className += ' bg-lime-600'

    } else {
      setQuantidadeErros((prev) => prev + 1)
      letraCorreta.className += ' bg-red-600'
      letraCorreta.className += ' erro'
    }
    setContagem((prev) => prev + 1)
  }

  function handleAtualizaTexto() {
    preencheTexto()
    switchDigitacao(true)
    setQuantidadeAcertos(0)
    setQuantidadeErros(0)
    setCronometro(60)
    setContagem(0)
  }

  function segundosPraMinutos(segundos: number) {
    var min = Math.floor(segundos / 60);
    var sec = Math.floor(segundos % 60);

    var mDisplay = min > 10 ? min : '0' + min;
    var sDisplay = sec > 10 ? sec : '0' + sec;
    return mDisplay + ':' + sDisplay;
  }

  function switchDigitacao(bool: boolean) {
    if (refInputDigitacao.current) {
      refInputDigitacao.current.disabled = !bool
    }
  }

  function finalizaDigitacao() {
    switchDigitacao(false)
    setCronometroAtivo(false)
    setTextosFinalizados((prev) => [...prev, { texto: listaLetras, numero_acertos: quantidadeAcertos, numero_erros: quantidadeErros, tempo_total: cronometro, palavras_por_minuto: (((quantidadeAcertos + quantidadeErros) / 5) * (cronometro == 0 ? 1 : 60 / cronometro)) } as cardTexto])
    api.post('/historico', {
      id_usuario: user.id,
      texto: JSON.stringify(listaLetras),
      quantidade_acertos: quantidadeAcertos,
      quantidade_erros: quantidadeErros,
      palavras_por_minuto: (((quantidadeAcertos + quantidadeErros) / 5) * (cronometro == 0 ? 1 : 60 / cronometro)).toFixed(2),
      tempo_total: 60 - cronometro,
    }).then((retorno) => {
      console.log(retorno)
    }).catch((retorno) => {
      console.log(retorno)
    })
    //TODO: adiocionar texto ao histórico banco de dados
  }

  return (
    <div className="flex flex-col text-slate-50">
      <div className="flex gap-1">
        {/* <p>Linguagem:</p>
        <select className="outline outline-1 rounded px-1 text-sm">
          <option value="pt-br">🏳Português</option>
          <option value="en-us">🏳Inglês</option>
        </select> */}
      </div>
      <div className="w-full h-56 outline outline-1 rounded mt-4 mb-1 p-2 text-xl font-medium overflow-auto text-justify" ref={refDivPalavras} id="divPalavras" onClick={() => refInputDigitacao.current?.focus()}>
        {listaLetras.map((letra, index) => {
          if (letra.children === ' ') {
            return <span className={letra.className + ' inline-block text-center'} style={{ minWidth: '4px', height: '27px' }} key={index}>&nbsp;</span>
          }
          return <span className={letra.className} key={index}>{letra.children}</span>
        })}
      </div>
      <div className="flex items-center justify-end w-full mt-1 gap-1">
        <div className="justify-center"><p className="bg-slate-700 rounded font-medium px-2">{segundosPraMinutos(cronometro)}</p></div>
        <button className="w-1/4 bg-sky-600 rounded" onClick={() => { handleAtualizaTexto() }}>
          <RefreshIcon></RefreshIcon>
        </button>
      </div>
      <input autoFocus
        tabIndex={0}
        type="text"
        ref={refInputDigitacao}
        className="w-0 h-0"
        onChange={(e) => {
          handleDigitacao(e)
          e.target.value = ''
        }}
        onKeyUp={(e) => handleApagar(e)}
      />
      <div className='flex'>
        {textosFinalizados.length > 0 &&
          <div className="flex flex-col bg-slate-800  w-1/4 h-96 rounded mt-2 overflow-y-auto">
            {
              textosFinalizados.map((texto, index) => {
                let multiplicadorTempo = 1
                if (texto.tempo_total !== 0) {
                  multiplicadorTempo = 60 / texto.tempo_total
                }
                const sum = (texto.numero_acertos + texto.numero_erros);
                const precisao = sum == 0 ? 0 : (texto.numero_acertos / sum) * 100;
                return <div className="text-white whitespace-nowrap bg-slate-600 rounded  px-4  py-2 m-1 text-sm font-medium" key={index} onClick={(e) => {
                  setTextoCardAtual(texto)
                }}>
                  <div className='flex items-center '>
                    <p className='text-lime-500'>{texto.numero_acertos}</p>/<p className='text-red-400'>{texto.numero_acertos}</p>
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
          </div>}
        {textoCardAtual &&
          <div className='bg-slate-600 w-3/4 h-96 rounded px-4 py-2 ml-2 mt-2 text font-medium'>
            <div className="border w-full h-56 rounded mt-1 p-2 text-xl font-medium overflow-auto" >
              {textoCardAtual.texto.map((letra, index) => {
                if (letra.children === ' ') {
                  return <span className={letra.className + ' inline-block text-center'} style={{ minWidth: '4px', height: '27px' }} key={index}>&nbsp;</span>
                }
                return <span className={letra.className} key={index}>{letra.children}</span>
              })}
            </div>
            <p className='text-lime-500'>Quantidade acertos: {textoCardAtual.numero_acertos}</p>
            <p className='text-red-400'>Quantidade erros: {textoCardAtual.numero_erros}</p>
            <p>Tempo: {60 - textoCardAtual.tempo_total}s</p>
            <p>Velocidade: {(((textoCardAtual.numero_acertos + textoCardAtual.numero_erros) / 5) * (textoCardAtual.tempo_total == 0 ? 1 : 60 / textoCardAtual.tempo_total)).toFixed(2)} ppm</p>
          </div>
        }
      </div>
    </div>
  )
}