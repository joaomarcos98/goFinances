import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionDataProps } from "../../components/TransactionCard";
import * as S from "./styles"

export interface DataListProps extends TransactionDataProps {
    id: string
}

export const Dashboard = () => {
    const data: DataListProps[] = [
        {
            id: "1",
            type: "positive",
            title: "Depósito Betway",
            amount: "R$ 5.000,00",
            category: {
                name: "Vendas",
                icon: "dollar-sign"
            },
            date: "17/03/2022"
        },
        {
            id: "2",
            type: "negative",
            title: "Hamburgueria Santa Fome",
            amount: "R$ 59,00",
            category: {
                name: "Alimentação",
                icon: "coffee"
            },
            date: "17/03/2022"
        },
        {
            id: "3",
            type: "negative",
            title: "Celular",
            amount: "R$ 1.200,00",
            category: {
                name: "Casa",
                icon: "shopping-bag"
            },
            date: "17/03/2022"
        }

    ];

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
                    amount="R$ 7.000,00"
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

            <S.Transactions>
                <S.Title>Listagem:</S.Title>


                <S.TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />


            </S.Transactions>


        </S.Container>
    )
}