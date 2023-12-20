import { ReactNode, createContext, useState } from "react";
import { cardTexto } from "../pages/dashboard";
import { api } from "../services/api";

interface HistoricoProviderProps {
    children: ReactNode
}


interface contagemErros {
    caracter: string,
    numero_erros: number,
    numero_acertos: number,
    porcentagem_erros: number,
    porcentagem_acertos: number,
    label: string
}

type HistoricoContextData = {
    listaErros: contagemErros[],
    listaHistorico: cardTexto[],
    atualizaHistorico: () => void
}

export const HistoricoContext = createContext({} as HistoricoContextData)

export function HistoricoProvider({ children }: HistoricoProviderProps) {
    const [listaHistorico, setListaHistorico] = useState<cardTexto[]>([] as cardTexto[])
    const [listaErros, setListaErros] = useState<contagemErros[]>([] as contagemErros[])

    function atualizaHistorico() {
        if (!localStorage.getItem('id_usuario')) return
        api.get('/historico/textos', {
            timeout: 3000,
            params: {
                id_usuario: localStorage.getItem('id_usuario')
            }
        }).then((validation) => {
            if(validation.data.length == 0) return

            const lista = validation.data.map((item: cardTexto) => {
                item.data_resumida = new Date(item.data!.toString()).toLocaleDateString('pt-BR')
                return item;
            })
            setListaHistorico(lista)

        }).catch((err) => {
            console.log(err)
        })

        api.get('/historico/teclas', {
            timeout: 3000,
            params: {
                id_usuario: localStorage.getItem('id_usuario')
            },
        })
            .then((validation) => {
                setListaErros(validation.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <HistoricoContext.Provider value={{ listaErros, listaHistorico, atualizaHistorico }}>
            {children}
        </HistoricoContext.Provider>
    )
}