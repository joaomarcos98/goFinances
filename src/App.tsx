import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import codePush from "react-native-code-push";

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from "@expo-google-fonts/poppins";

import theme from "./global/styles/theme";
import { Routes } from "./routes/index.routes";
import { StatusBar } from "react-native";
import { AuthProvider, useAuth } from "./hooks/auth";

function App() {

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    const { isLoading } = useAuth()

    if (!fontsLoaded || isLoading) {
        return <AppLoading />
    }

    useEffect(() => {
        codePush.sync({
            installMode: codePush.InstallMode.IMMEDIATE
        })
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.colors.primary}
                />
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}

export default codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_START
})(App);