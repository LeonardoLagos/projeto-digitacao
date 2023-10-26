import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [contagem, setContagem] = useState(0)
  const [listaLetras, setListaLetras] = useState<string[]>([])
  const refDivPalavras = useRef<HTMLDivElement>(null)
  const refInputDigitacao = useRef<HTMLInputElement>(null)
  const [listaSpans, setListaSpans] = useState<HTMLCollectionOf<Element>>()
  const listaPalavras = [
    'Em um pequeno vilarejo, nas montanhas distantes, vivia um jovem artesão chamado Elias. Ele esculpia esculturas incríveis usando madeira local. Cada peça contava uma história única. Um dia, enquanto trabalhava, encontrou uma antiga caixa enterrada. Dentro dela, havia um mapa misterioso que o levou a uma jornada emocionante. Ele seguiu as trilhas sinuosas até uma caverna oculta, onde descobriu um tesouro perdido há séculos. O vilarejo nunca mais foi o mesmo. Elias se tornou uma lenda local, e suas esculturas ganharam ainda mais significado com a história do tesouro. O vilarejo prosperou, atraindo viajantes de todos os lugares. E assim, a pequena comunidade floresceu graças à coragem e determinação de um jovem artesão e ao mistério de um tesouro perdido.',
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

      listaSpans![contagem - 1]?.classList.remove('bg-lime-400')
      listaSpans![contagem - 1]?.classList.remove('bg-red-400')
      listaSpans![contagem - 1]?.classList.remove('bg-amber-400')
      setContagem((prev) => prev - 1)
      return
    }
  }

  function handleDigitacao(e: React.ChangeEvent<HTMLInputElement>) {
    const teclaDigitada = e.target.value

    const letraCorreta = listaLetras[contagem]
    const spanLetra = listaSpans![contagem]
    if (spanLetra === undefined) return

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
      <input autoFocus tabIndex={0} type="text" ref={refInputDigitacao} className="w-0 h-0"
        onChange={(e) => {
          handleDigitacao(e)
          e.target.value = ''
        }}
        onKeyUp={(e) => handleApagar(e)}
      />
    </div>
  )
}