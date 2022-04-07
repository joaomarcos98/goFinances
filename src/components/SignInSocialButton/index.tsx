import React from "react";
import { RectButtonProps } from "react-native-gesture-handler"
import { SvgProps } from "react-native-svg";

import * as S from "./styles";

interface SignInSocialButton extends RectButtonProps {
    title: string;
    icon: React.FC<SvgProps>
}

export const SignInSocialButton = ({ title, icon: Icon, ...rest }: SignInSocialButton) => {
    return (
        <S.Button
            {...rest}
        >
            <S.ImageContainer>
                <Icon />
            </S.ImageContainer>
            <S.Text>
                {title}
            </S.Text>
        </S.Button>
    )
}