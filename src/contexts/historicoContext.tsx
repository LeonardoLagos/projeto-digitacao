import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { cardTexto } from "../pages/dashboard";
import { api } from "../services/api";
import { UserContext } from "./userContext";

export type Usuario = {
    id: number,
    nome: string,
    email: string,
    fotoPerfil: string
}

interface HistoricoProviderProps {
    children: ReactNode
}

type HistoricoContextData = {
    listaHistorico: cardTexto[],
    atualizaHistorico: () => void
}

export const HistoricoContext = createContext({} as HistoricoContextData)

export function HistoricoProvider({ children }: HistoricoProviderProps) {
    const [listaHistorico, setListaHistorico] = useState<cardTexto[]>([] as cardTexto[])
    const { user } = useContext(UserContext)

    function atualizaHistorico() {
        api.get('/historico/textos', {
            timeout: 3000,
            params: {
                id_usuario: user.id
            }
        })
            .then((validation) => {
                setListaHistorico(validation.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <HistoricoContext.Provider value={{ listaHistorico, atualizaHistorico }}>
            {children}
        </HistoricoContext.Provider>
    )
}