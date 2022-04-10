import React, { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";

type AuthContextProps = {
    children: ReactNode;
}

type User = {
    id: string;
    name: string;
    email: string;
    picture?: string;
}

type AuthContextData = {
    user: User;
    signInWithGoogle(): Promise<void>
}

type AuthResponse = {
    params: {
        access_token: string
    }
    type: string
}

const { REDIRECT_URI } = process.env;
const { CLIENT_ID } = process.env;

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthContextProps) => {

    const [user, setUser] = useState<User>({} as User);

    const signInWithGoogle = async () => {
        try {
            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI("profile email");

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthResponse


            if (type === "success") {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json()

                setUser({
                    id: userInfo.id,
                    name: userInfo.given_name,
                    email: userInfo.email,
                    picture: userInfo.picture
                })
            }


        } catch (error) {
            throw new Error("error");
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context
}
