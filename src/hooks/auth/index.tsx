import React, { createContext, ReactNode, useContext } from "react";


type AuthContextProps = {
    children: ReactNode;
}

type User = {
    id: string;
    name: string;
    email: string;
    photo?: string
}

type AuthContextData = {
    user: User
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthContextProps) => {

    const user = {
        id: "172364872364",
        name: "João Marcos Belanga",
        email: "joaomarcos@gmail.com"
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context
}
