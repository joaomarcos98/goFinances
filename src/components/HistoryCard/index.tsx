import React from "react";
import * as S from "./styles"


type HistoryCardProps = {
    color: string;
    title: string;
    amount: string;
}

export const HistoryCard = ({ color, title, amount }: HistoryCardProps) => {
    return (
        <S.Container color={color} testID="history-card-container">
            <S.Title>{title}</S.Title>
            <S.Amount>{amount}</S.Amount>
        </S.Container>
    )
}