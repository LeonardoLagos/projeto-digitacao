import { cardTexto } from '../../pages/dashboard'

export default function ModalInfoCompleto(props: { informacoesModal: cardTexto }) {
    return (
        <div className='bg-slate-600 w-3/4 h-96 rounded px-4 py-2 ml-2 mt-2 text font-medium'>
            <div className="border w-full h-56 rounded mt-1 p-2 text-xl font-medium overflow-auto" >
                {props.informacoesModal.texto !== undefined &&
                    props.informacoesModal.texto.map((letra, index) => {
                        if (letra.children === ' ') {
                            return <span className={letra.className + ' inline-block text-center'} style={{ minWidth: '4px', height: '27px' }} key={index}>&nbsp;</span>
                        }
                        return <span className={letra.className} key={index}>{letra.children}</span>
                    })}
            </div>
            <p className='text-lime-500'>Quantidade acertos: {props.informacoesModal.numero_acertos}</p>
            <p className='text-red-400'>Quantidade erros: {props.informacoesModal.numero_erros}</p>
            <p className='text-amber-500'>Quantidade correcoes: {props.informacoesModal.numero_correcoes}</p>
            <p>Tempo: {60 - props.informacoesModal.tempo_total}s</p>
            <p>Velocidade: {props.informacoesModal.palavras_por_minuto} ppm</p>
        </div>
    )
}
