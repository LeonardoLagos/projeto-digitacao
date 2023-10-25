import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [contagem, setContagem] = useState(0)
  const [listaLetras, setListaLetras] = useState<string[]>([])
  const refDivPalavras = useRef<HTMLDivElement>(null)
  const refInputDigitacao = useRef<HTMLInputElement>(null)
  const [listaSpans, setListaSpans] = useState<HTMLCollectionOf<Element>>()
  const listaPalavras = [
    'abacate',
    'quero-quero',
    'cão',
    'é',
    'à',
    'á',
    'abacaxi',
    '`',
    'abobora',
    'abobrinha',
    'abracar',
    'abracadabra',
    'abracadeira',
    'abracar',
    'bola',
    'bolo',
    'bolacha',
    'casa',
    'cachorro',
    'cachaca',
    'dado',
    'xuxu',
    'zumbi',
    'dado',
    'cachaca',
    'obrigado',
    'obrigada',
    'saudade',
    'quero-quero',
    'rapadura',
    'rapaz',
    'raposa',
    'rapido',
  ]
  
  useEffect(() => {
    setListaLetras([])
    listaPalavras.map((palavra, index) => {
      for (const letra of palavra) {
        setListaLetras((prev) => [...prev, letra])
      }
      if (index === listaPalavras.length - 1) return
      setListaLetras((prev) => [...prev, ' '])
    })

    setListaSpans(refDivPalavras.current?.getElementsByClassName('letras'))
  }, [])

  function handleApagar(e: React.KeyboardEvent<HTMLInputElement>) {
    const letraPresionada = e.key
    if (letraPresionada === 'Backspace') {
      if (contagem === 0) return

      listaSpans![contagem - 1]?.classList.remove('bg-green-500')
      listaSpans![contagem - 1]?.classList.remove('bg-red-500')
      setContagem(contagem - 1)
      return
    }
  }

  function handleDigitacao(e: React.ChangeEvent<HTMLInputElement>) {
    const teclaDigitada = e.target.value

    const letraCorreta = listaLetras[contagem]
    const spanLetra = listaSpans![contagem]
    if (spanLetra === undefined) return

    if (teclaDigitada === letraCorreta) {
      spanLetra.classList.add('bg-green-500')
    } else {
      spanLetra.classList.add('bg-red-500')
    }
    setContagem(contagem + 1)
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
      <div className="w-full h-56 outline outline-1 rounded mt-4 mb-2 p-2 text-xl" ref={refDivPalavras} onClick={() => refInputDigitacao.current?.focus()}>
        {listaLetras.map((letra, index) => {
          return <span className="letras" key={index}>{letra}</span>
        })}
      </div>
      <input autoFocus tabIndex={0} type="text" ref={refInputDigitacao} className="w-0"
        onChange={(e) => {
          handleDigitacao(e)
          e.target.value = ''
        }}
        onKeyUp={(e) => handleApagar(e)}
      />
    </div>
  )
}