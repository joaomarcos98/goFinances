import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import * as S from "./styles";

interface CategorySelectProps extends RectButtonProps {
    title: string,
}

export const CategorySelectButton = ({ title, ...rest }: CategorySelectProps) => {
    return (
        <S.Container
            {...rest}
        >
            <S.Category>{title}</S.Category>
            <S.Icon name="chevron-down" />
        </S.Container>
    )
} 