import React from 'react'

export default function FundoParaSobreposicao(props: { children: React.ReactNode, modalVisivel: boolean, setModalVisivel: Function }) {
    return (
        props.modalVisivel && (
            <div className='absolute w-screen h-screen z-50' >
                {props.children}
            </div>)
    )
}
