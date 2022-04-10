import * as GoogleAuth from "expo-auth-session";
import * as AppleAuth from "expo-apple-authentication";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    signInWithApple(): Promise<void>
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
    const [isLoading, setIsLoading] = useState(true);

    const userStorageKey = "@gofinances:user";

    const signInWithGoogle = async () => {
        try {
            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI("profile email");

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { params, type } = await GoogleAuth.startAsync({ authUrl }) as AuthResponse


            if (type === "success") {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json()

                const userLogged = {
                    id: userInfo.id,
                    name: userInfo.given_name,
                    email: userInfo.email,
                    picture: userInfo.picture
                };

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }


        } catch (error) {
            throw new Error("error");
        }
    }

    const signInWithApple = async () => {
        try {
            const credential = await AppleAuth.signInAsync({
                requestedScopes: [
                    AppleAuth.AppleAuthenticationScope.FULL_NAME,
                    AppleAuth.AppleAuthenticationScope.EMAIL
                ]
            })

            if (credential) {

                const userLogged = {
                    id: String(credential.user),
                    name: credential.fullName!.givenName!,
                    email: credential.email!,
                    picture: undefined
                }
                setUser(userLogged)

                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));

            }
        } catch (err) {
            throw new Error("error")
        }
    }

    useEffect(() => {
        const loadUserStorageData = async () => {
            const userStorage = await AsyncStorage.getItem(userStorageKey);

            if (userStorage) {
                const userLogged = JSON.parse(userStorage) as User;
                setUser(userLogged)
            }
            setIsLoading(false)
        }

        loadUserStorageData()
    }, [])

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context
}
