import React from 'react'
import Header from '../components/Header/Header'

interface HeaderProviderProps {
    children: React.ReactNode
}

export const HeaderContext = React.createContext({})

export default function HeaderProvider(props: HeaderProviderProps) {
    return (
        <HeaderContext.Provider value={{}}>
            <Header></Header>
            {props.children}
        </HeaderContext.Provider>
    )
}
