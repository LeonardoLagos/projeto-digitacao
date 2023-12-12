import { ReactNode, createContext, useEffect, useState } from "react";
import { apiLogin } from "../services/apiLogin";

export type Usuario = {
    id: string,
    nome: string,
    email: string,
    fotoPerfil: string
}

interface UserProviderProps {
    children: ReactNode
}

type UserContextData = {
    user: Usuario,
    setUser: (user: Usuario) => void
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState({} as Usuario)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}