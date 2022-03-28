import React from "react";
import * as S from "./styles"

export const HighlightCard = () => {
    return (
        <S.Container>
            <S.Header>
                <S.Title>Entrada</S.Title>
                <S.Icon name="arrow-up-circle" />
            </S.Header>
            <S.Body>
                <S.Amount>R$ 17.4000,00</S.Amount>
                <S.LastTransaction>Ontem</S.LastTransaction>
            </S.Body>
        </S.Container>
    )
}