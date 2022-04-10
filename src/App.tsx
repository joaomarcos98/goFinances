import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from "@expo-google-fonts/poppins";

import theme from "./global/styles/theme";
import { Routes } from "./routes/index.routes";
import { StatusBar } from "react-native";
import { SignIn } from "./screens/SignIn";
import { AuthProvider } from "./hooks/auth";

export default function App() {

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }
    Routes

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
