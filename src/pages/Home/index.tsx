import { useEffect, useRef, useState } from "react"
import RefreshIcon from '@mui/icons-material/Refresh';
import { set } from "react-hook-form";

interface cardTexto {
  listaSpans: HTMLCollectionOf<Element>,
  divTexto: HTMLDivElement

}

export default function Home() {
  const [contagem, setContagem] = useState(0)
  const [listaLetras, setListaLetras] = useState<string[]>([])
  const refDivPalavras = useRef<HTMLDivElement>(null)
  const refInputDigitacao = useRef<HTMLInputElement>(null)
  const [listaSpans, setListaSpans] = useState<HTMLCollectionOf<Element>>()
  const [cronometroAtivo, setCronometroAtivo] = useState(false)
  const [cronometro, setCronometro] = useState(60)
  const [textosFinalizados, setTextosFinalizados] = useState<cardTexto[]>([])
  const listaPalavras = [
    'Em um pequeno vilarejo, nas montanhas distantes, vivia um jovem artesão chamado Doran. Ele esculpia esculturas incríveis usando madeira local. Cada peça contava uma história única. Um dia, enquanto trabalhava, encontrou uma antiga caixa enterrada. Dentro dela, havia um mapa misterioso que o levou a uma jornada emocionante. Ele seguiu as trilhas sinuosas até uma caverna oculta, onde descobriu um tesouro perdido há séculos. O vilarejo nunca mais foi o mesmo. Doran se tornou uma lenda local, e suas esculturas ganharam ainda mais significado com a história do tesouro. O vilarejo prosperou, atraindo viajantes de todos os lugares. E assim, a pequena comunidade floresceu graças à coragem e determinação de um jovem artesão e ao mistério de um tesouro perdido.',
    'Em um mundo agitado, encontrar paz interior é essencial. Através da meditação, podemos alcançar clareza mental e equilíbrio emocional. Praticar a gratidão diária também nutre nossa alma, lembrando-nos das pequenas alegrias da vida. Cultivar relações significativas e cuidar da saúde física são pilares para uma vida plena. Ao aceitarmos desafios com resiliência e abraçarmos a positividade, construímos um caminho para a felicidade genuína. A jornada da autodescoberta é infinita, e cada passo nos aproxima de uma existência mais significativa e harmoniosa.',
    'A busca pelo conhecimento é uma jornada infinita. Aprender é a chave para o crescimento pessoal e profissional. Cada desafio que enfrentamos nos ensina valiosas lições. A curiosidade é o motor que impulsiona a descoberta. Portanto, nunca pare de explorar, questionar e aprender. O mundo é vasto e cheio de maravilhas esperando para serem descobertas.'
  ]

  function preencheTexto() {
    const frase = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    setListaLetras([])
    for (const letra of frase) {
      setListaLetras((prev) => [...prev, letra])
      // listaPalavras.map((palavra, index) => {
      // if (index === listaPalavras.length - 1) return
      // setListaLetras((prev) => [...prev, ' '])
      // })
    }
    setListaSpans(refDivPalavras.current?.getElementsByClassName('letras'))
    if (listaSpans) {
      for (const elemento of listaSpans) {
        elemento.classList.remove('bg-lime-400')
        elemento.classList.remove('bg-red-400')
        elemento.classList.remove('bg-amber-400')
        elemento.classList.remove('erro')
      }
    }
    setCronometroAtivo(false)
  }

  useEffect(() => {
    preencheTexto()
  }, [])

  useEffect(() => {
    if (cronometro === 0) return
    if (!cronometroAtivo) return
    const interval = setInterval(() => {
      setCronometro((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [cronometro, cronometroAtivo])

  function handleApagar(e: React.KeyboardEvent<HTMLInputElement>) {
    const letraPresionada = e.key
    if (letraPresionada === 'Backspace') {
      if (contagem === 0) return

      listaSpans![contagem - 1]?.classList.remove('bg-lime-400')
      listaSpans![contagem - 1]?.classList.remove('bg-red-400')
      listaSpans![contagem - 1]?.classList.remove('bg-amber-400')
      setContagem((prev) => prev - 1)
      controleCronometro()
      return
    }
  }

  function handleDigitacao(e: React.ChangeEvent<HTMLInputElement>) {
    const teclaDigitada = e.target.value

    const letraCorreta = listaLetras[contagem]
    const spanLetra = listaSpans![contagem]
    if (contagem === listaLetras.length) {
      return
    }

    if (teclaDigitada === letraCorreta) {
      if (spanLetra.classList.contains('erro'))
        spanLetra.classList.add('bg-amber-400')
      else
        spanLetra.classList.add('bg-lime-400')
    } else {
      spanLetra.classList.add('bg-red-400')
      spanLetra.classList.add('erro')
    }
    setContagem((prev) => prev + 1)
    controleCronometro()
  }

  function handleAtualizaTexto() {
    setContagem(0)
    setCronometro(60)
    setListaLetras([])
    preencheTexto()
  }

  function segundosPraMinutos(segundos: number) {
    var min = Math.floor(segundos / 60);
    var sec = Math.floor(segundos % 60);

    var mDisplay = min > 10 ? min : '0' + min;
    var sDisplay = sec > 10 ? sec : '0' + sec;
    return mDisplay + ':' + sDisplay;
  }

  function controleCronometro() {
    if (contagem + 1 === listaLetras.length) {
      setTextosFinalizados((prev) => [...prev, { listaSpans: listaSpans!, divTexto: refDivPalavras.current! }])
      setCronometroAtivo(false)
    } else {
      setCronometroAtivo(true)

    }
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
      <div className="w-full h-56 outline outline-1 rounded mt-4 mb-1 p-2 text-xl" ref={refDivPalavras} onClick={() => refInputDigitacao.current?.focus()}>
        {listaLetras.map((letra, index) => {
          return <span className="letras" key={index}>{letra}</span>
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
      {
        textosFinalizados.map((texto, index) => {
          let acertos = 0
          let erros = 0
          for(const span of texto.listaSpans){
            if(span.classList.contains('bg-lime-400'))
              acertos++
            if(span.classList.contains('bg-red-400'))
              erros++
          }
          return <div>
            {acertos} {erros}
          </div>
        })
      }
    </div>
  )
}