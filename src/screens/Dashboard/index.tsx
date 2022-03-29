import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import * as S from "./styles"

export const Dashboard = () => {
    return (
        <S.Container >
            <S.Header>
                <S.UserContainer>
                    <S.UserInfo>
                        <S.Photo source={{ uri: "https://avatars.githubusercontent.com/u/72817686?v=4" }} />
                        <S.User>
                            <S.UserGreeting>Olá, </S.UserGreeting>
                            <S.UserName>João Marcos</S.UserName>
                        </S.User>
                    </S.UserInfo>
                    <S.Icon name="power" />
                </S.UserContainer>
            </S.Header>

            <S.HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.000,00"
                    lastTransaction="Última entrada dia 13 de abril de 2022"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de abril de 2022"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="1 a 16 de abril de 2022"
                />
            </S.HighlightCards>




        </S.Container>
    )
}