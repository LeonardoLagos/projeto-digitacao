import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useRef, useState } from "react";

interface cardTexto {
  listaSpans: spanProps[],
  quantidadeAcertos: number,
  quantidadeErros: number,
  tempoRestante: number
}

interface spanProps {
  className: string,
  children: string
}

export default function Home() {
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
  const listaPalavras = [
    'Em um pequeno vilarejo, nas montanhas distantes, vivia um jovem artesão chamado Doran. Ele esculpia esculturas incríveis usando madeira local. Cada peça contava uma história única. Um dia, enquanto trabalhava, encontrou uma antiga caixa enterrada. Dentro dela, havia um mapa misterioso que o levou a uma jornada emocionante. Ele seguiu as trilhas sinuosas até uma caverna oculta, onde descobriu um tesouro perdido há séculos. O vilarejo nunca mais foi o mesmo. Doran se tornou uma lenda local, e suas esculturas ganharam ainda mais significado com a história do tesouro. O vilarejo prosperou, atraindo viajantes de todos os lugares. E assim, a pequena comunidade floresceu graças à coragem e determinação de um jovem artesão e ao mistério de um tesouro perdido.',
    'Em um mundo agitado, encontrar paz interior é essencial. Através da meditação, podemos alcançar clareza mental e equilíbrio emocional. Praticar a gratidão diária também nutre nossa alma, lembrando-nos das pequenas alegrias da vida. Cultivar relações significativas e cuidar da saúde física são pilares para uma vida plena. Ao aceitarmos desafios com resiliência e abraçarmos a positividade, construímos um caminho para a felicidade genuína. A jornada da autodescoberta é infinita, e cada passo nos aproxima de uma existência mais significativa e harmoniosa.',
    'A busca pelo conhecimento é uma jornada infinita. Aprender é a chave para o crescimento pessoal e profissional. Cada desafio que enfrentamos nos ensina valiosas lições. A curiosidade é o motor que impulsiona a descoberta. Portanto, nunca pare de explorar, questionar e aprender. O mundo é vasto e cheio de maravilhas esperando para serem descobertas.'
  ]

  function preencheTexto() {
    setCronometroAtivo(false)
    const frase = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    setListaLetras([])
    for (const letra of frase) {
      setListaLetras((prev) => [...prev, { className: '', children: letra }])
    }
    refInputDigitacao.current?.focus()
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

      caractereAnterior.className = caractereAnterior.className.replace('bg-lime-400', '')
      caractereAnterior.className = caractereAnterior.className.replace('bg-red-400', '')
      caractereAnterior.className = caractereAnterior.className.replace('bg-amber-400', '')
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
        letraCorreta.className += ' bg-amber-400'
      else
        letraCorreta.className += ' bg-lime-400'

    } else {
      setQuantidadeErros((prev) => prev + 1)
      letraCorreta.className += ' bg-red-400'
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
    setTextosFinalizados((prev) => [...prev, { listaSpans: listaLetras, quantidadeAcertos, quantidadeErros, tempoRestante: cronometro }])
  }

  return (
    <div className="flex flex-col pt-2" >
      <div className="flex gap-1">
        <p>Linguagem:</p>
        <select className="outline outline-1 rounded px-1 text-sm">
          <option value="pt-br">🏳Português</option>
          <option value="en-us">🏳Inglês</option>
        </select>
      </div>
      <div className="w-full h-56 outline outline-1 rounded mt-4 mb-1 p-2 text-xl font-medium text-slate-800 overflow-auto" ref={refDivPalavras} id="divPalavras" onClick={() => refInputDigitacao.current?.focus()}>
        {listaLetras.map((letra, index) => {
          if (letra.children === ' ') {
            return <span className={letra.className + ' inline-block text-center'} style={{ minWidth: '4px', height: '27px' }} key={index}>&nbsp;</span>
          }
          return <span className={letra.className} key={index}>{letra.children}</span>
        })}
      </div>
      <div className="flex items-center justify-end w-full mt-1 gap-1">
        <div className="justify-center"><p className="bg-slate-300 rounded px-2">{segundosPraMinutos(cronometro)}</p></div>
        <button className="w-1/4 bg-sky-600 rounded" onClick={() => { handleAtualizaTexto() }}>
          <RefreshIcon sx={{ color: "white" }}></RefreshIcon>
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
        <div className="flex flex-col bg-black  w-1/4 h-96 rounded mt-2 overflow-y-auto">
          {
            textosFinalizados.reverse().map((texto, index) => {
              let multiplicadorTempo = 1
              if (texto.tempoRestante !== 0) {
                multiplicadorTempo = 60 / texto.tempoRestante
              }
              const sum = (texto.quantidadeAcertos + texto.quantidadeErros);
              const precisao = sum == 0 ? 0 : (texto.quantidadeAcertos / sum) * 100;
              return <div className="text-white whitespace-nowrap bg-slate-600 rounded  px-4  py-2 m-1 text-sm font-medium" key={index} onClick={(e) => {
                setTextoCardAtual(texto)
              }}>
                <div className='flex items-center '>
                  <p className='text-lime-400'>{texto.quantidadeAcertos}</p>/<p className='text-red-500'>{texto.quantidadeErros}</p>
                  <div className='bg-red-500 h-2 w-full rounded overflow-hidden mx-2'>
                    <div className='bg-lime-500' style={{
                      width: `${precisao}%`,
                      height: '8px'
                    }}></div>
                  </div>
                  <p className='text-lime-400'>{precisao.toFixed(2)}%</p>
                </div>
                {/* <p>tempo: {60 - texto.tempoRestante}s</p> */}
                <p>Velocidade: {((sum / 5) * multiplicadorTempo).toFixed(2)} ppm</p>
              </div>
            })
          }
        </div>}
        {textoCardAtual &&
          <div className='bg-slate-600 w-3/4 h-96 rounded px-4 py-2 ml-2 mt-2 text font-medium text-white'>
            <div className="bg-white  w-full h-56 rounded mt-1 p-2 text-xl font-medium text-slate-800 overflow-auto" >
              {textoCardAtual.listaSpans.map((letra, index) => {
                if (letra.children === ' ') {
                  return <span className={letra.className + ' inline-block text-center'} style={{ minWidth: '4px', height: '27px' }} key={index}>&nbsp;</span>
                }
                return <span className={letra.className} key={index}>{letra.children}</span>
              })}
            </div>
            <p className='text-lime-400'>Quantidade acertos: {textoCardAtual.quantidadeAcertos}</p>
            <p className='text-red-400'>Quantidade erros: {textoCardAtual.quantidadeErros}</p>
            <p>Tempo: {60 - textoCardAtual.tempoRestante}s</p>
            <p>Velocidade: {(((textoCardAtual.quantidadeAcertos + textoCardAtual.quantidadeErros) / 5) * (60 / textoCardAtual.tempoRestante)).toFixed(2)} ppm</p>
          </div>
        }
      </div>
    </div>
  )
}