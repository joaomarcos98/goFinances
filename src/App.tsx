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
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from './routes/app.routes';
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


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={theme.colors.primary}
                    />
                    <AuthProvider>
                        <SignIn />
                    </AuthProvider>
                </NavigationContainer>
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}
