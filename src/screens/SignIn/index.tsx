import React, { useState } from "react"
import * as S from "./styles";
import LogoSvg from "../../assets/logo.svg"
import AppleSvg from "../../assets/apple.svg"
import GoogleSvg from "../../assets/google.svg"
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components";


export const SignIn = () => {

    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    const { signInWithGoogle, signInWithApple } = useAuth();

    const handleSignInWithGoogle = async () => {
        try {
            setIsLoading(true)
            await signInWithGoogle()
        } catch (err) {
            console.log(err);
            Alert.alert('Não foi possível conectar a Google')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInWithApple = async () => {
        try {
            setIsLoading(true)
            await signInWithApple()
        } catch (err) {
            console.log(err);
            Alert.alert('Não foi possível conectar a Google')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <S.Container>
            <S.Header>
                <S.TitleContent>
                    <LogoSvg
                        width={120}
                        height={68}
                    />

                    <S.Title>
                        Controle suas {'\n'}
                        finanças de forma muito simples
                    </S.Title>
                </S.TitleContent>

                <S.SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </S.SignInTitle>
            </S.Header>
            <S.Footer>
                <S.FooterContainer>
                    <SignInSocialButton
                        title="Entrar com Google"
                        icon={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    {
                        Platform.OS === "ios" &&
                        <SignInSocialButton
                            title="Entrar com Apple"
                            icon={AppleSvg}
                            onPress={handleSignInWithApple}
                        />
                    }
                </S.FooterContainer>

                {isLoading &&
                    <ActivityIndicator
                        color={theme.colors.shape}
                        style={{marginTop: 18}}
                    />
                }
            </S.Footer>
        </S.Container>
    )
}