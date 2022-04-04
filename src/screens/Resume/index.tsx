import React from "react";

import * as S from "./styles"
import { HistoryCard } from "../../components/HistoryCard";

export const Resume = () => {
    return (
        <S.Container>
            <S.Header>
                <S.Title>
                    Resumo por categoria
                </S.Title>
            </S.Header>

            <HistoryCard
                color="red"
                title="Compras"
                amount="R$ 150,00"

            />

        </S.Container>
    )
}