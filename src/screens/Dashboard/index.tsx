import { ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as S from "./styles"
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionDataProps } from "../../components/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionDataProps {
    id: string
}

type HighlightProps = {
    amount: string;
    lastTransaction: string;
}

type HighlightData = {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

const toBRDate = (date: any) => {

    if (date) {
        return Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        }).format(new Date(date))
    }
    return ""
}

const toCurrency = (param: number) => {
    return param.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

const getLastTransactionDate = (
    collection: DataListProps[],
    type: "positive" | "negative"
) => {
    if (collection[0]) {

        const lastTransactions = new Date(
            Math.max.apply(Math, collection
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date(transaction.date).getTime()))
        )
        return toBRDate(lastTransactions)
    }

}

export const Dashboard = () => {

    const theme = useTheme();
    const { signOut } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const loadTransactions = async () => {
        const dataKey = "@goFinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesSum = 0;
        let expensive = 0;

        const transactionsFormatted: DataListProps[] = transactions.map(
            (item: DataListProps) => {

                if (item.type === "positive") {
                    entriesSum += Number(item.amount);
                } else {
                    expensive += Number(item.amount);
                }

                const amount = toCurrency(Number(item.amount));

                const date = toBRDate(item.date)

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date
                }
            })

        const lastTransactionEntries = getLastTransactionDate(transactions, "positive");
        const lastTransactionExpensive = getLastTransactionDate(transactions, "negative");

        const total = entriesSum - expensive;

        setTransactions(transactionsFormatted);
        setHighlightData({
            entries: {
                amount: toCurrency(entriesSum),
                lastTransaction: `Última saída dia ${lastTransactionEntries}`
            },
            expensives: {
                amount: toCurrency(expensive),
                lastTransaction: `Última saída dia ${lastTransactionExpensive}`
            },
            total: {
                amount: toCurrency(total),
                lastTransaction: ""
            }
        })
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []))


    return (
        <S.Container >

            {isLoading
                ? <S.LoadContainer>
                    <ActivityIndicator color={theme.colors.primary} />
                </S.LoadContainer>
                : <>
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
                            <S.LogoutButton onPress={signOut}>
                                <S.Icon name="power" />
                            </S.LogoutButton>
                        </S.UserContainer>
                    </S.Header>

                    <S.HighlightCards>
                        <HighlightCard
                            type="up"
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction={highlightData.entries.lastTransaction}
                        />
                        <HighlightCard
                            type="down"
                            title="Saídas"
                            amount={highlightData.expensives.amount}
                            lastTransaction={highlightData.expensives.lastTransaction}
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
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
                </>
            }
        </S.Container >
    )
}