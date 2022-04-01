import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionDataProps } from "../../components/TransactionCard";
import * as S from "./styles"
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionDataProps {
    id: string
}

export const Dashboard = () => {

    const [transactions, setTtansactions] = useState<DataListProps[]>([]);


    const loadTransactions = async () => {
        const dataKey = "@goFinances:transactions";

        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps[] = transactions.map(
            (item: DataListProps) => {
                const amount = Number(item.amount)
                    .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })

                const date = Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit"
                }).format(new Date(item.date))

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date
                }
            })

        console.log(transactionsFormatted);

        setTtansactions(transactionsFormatted)
    }

    useEffect(() => {
        loadTransactions()
    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []))

    return (
        <S.Container >
            <S.Header>
                <S.UserContainer>
                    <S.UserInfo>
                        <S.Photo source={{ uri: "https://avatars.githubusercontent.com/u/72817686?v=4" }} />
                        <S.User>
                            <S.UserGreeting>
                                Olá,
                            </S.UserGreeting>
                            <S.UserName>
                                João Marcos
                            </S.UserName>
                        </S.User>
                    </S.UserInfo>
                    <S.LogoutButton onPress={() => { }}>
                        <S.Icon name="power" />
                    </S.LogoutButton>
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
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />


            </S.Transactions>


        </S.Container>
    )
}