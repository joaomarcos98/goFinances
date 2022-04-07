import React from "react"
import * as S from "./styles";
import LogoSvg from "../../assets/logo.svg"
import AppleSvg from "../../assets/apple.svg"
import GoogleSvg from "../../assets/google.svg"
import { SignInSocialButton } from "../../components/SignInSocialButton";


export const SignIn = () => {
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
                    />
                    <SignInSocialButton
                        title="Entrar com Apple"
                        icon={AppleSvg}
                    />
                </S.FooterContainer>
            </S.Footer>
        </S.Container>
    )
}