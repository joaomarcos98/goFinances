import React from "react";
import * as S from "./styles"


export type HighlighCardProps = {
    title: string;
    amount: string;
    lastTransaction: string;
    type: "up" | "down" | "total"
}

const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign"
}

export const HighlightCard = ({
    type,
    title,
    amount,
    lastTransaction
}: HighlighCardProps) => {
    return (
        <S.Container type={type} testID="highlight-card-container">
            <S.Header>
                <S.Title type={type}>{title}</S.Title>
                <S.Icon name={icon[type]} type={type} />
            </S.Header>
            <S.Body>
                <S.Amount type={type}>{amount}</S.Amount>
                <S.LastTransaction type={type}>{lastTransaction}</S.LastTransaction>
            </S.Body>
        </S.Container>
    )
}