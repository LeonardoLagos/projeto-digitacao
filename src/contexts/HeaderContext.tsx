import React from 'react'
import Header from '../components/Header/Header'
import { Container } from '@mui/material'

interface HeaderProviderProps {
    children: React.ReactNode
}

export const HeaderContext = React.createContext({})

export default function HeaderProvider(props: HeaderProviderProps) {
    return (
        <HeaderContext.Provider value={{}}>
            <Header></Header>
            <Container children={props.children}></Container>
        </HeaderContext.Provider>
    )
}
