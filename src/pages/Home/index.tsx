import { useState } from "react"
import { set } from "react-hook-form"

export default function Home() {
  const [text, setText] = useState('')
  const [contagem, setContagem] = useState(0)
  const listaPalavras = [
    'abacate',
    'quero-quero',
    'cão',
    'é',
    'à',
    'á',
    'abacaxi',
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
    'zumbi'
  ]
  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const valorTxt = e.target.value
    const Palavra = listaPalavras[contagem]
    setContagem(contagem + 1)

    if (valorTxt.includes(' ')) {
      setText('')
      return
    }

    setText(valorTxt)
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    console.log(e.key)
  }
  
  return (
    <div className="flex flex-col pt-2" onKeyUp={(e) => handleKeyPress(e)}>
      <div className="flex gap-1">
        <p>Linguagem:</p>
        <select className="outline outline-1 rounded px-1 text-sm">
          <option value="pt-br">🏳Português</option>
          <option value="en-us">🏳Inglês</option>
        </select>
      </div>
      <div className="w-full h-56 outline outline-1 rounded mt-4 mb-2 p-2 text-xl">
        {listaPalavras.map((palavra, index) => {
          return <span key={index}>{palavra} </span>
        })}
      </div>
    </div>
  )
}
