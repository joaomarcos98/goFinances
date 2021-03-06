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

    const collectionFilttered = collection
        .filter(transaction => transaction.type === type)

    if (!collectionFilttered.length) {
        return 0
    }

    const lastTransactions = new Date(
        Math.max.apply(Math, collectionFilttered
            .map(transaction => new Date(transaction.date).getTime()))
    )
    return toBRDate(lastTransactions)

}

export const Dashboard = () => {

    const theme = useTheme();
    const { signOut, user } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const loadTransactions = async () => {

        const dataKey = `@goFinances:transactions_user:${user.id}`;
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

        const totalInterval = !lastTransactionExpensive
            ? "N??o h?? transa????es"
            :  `01 a ${lastTransactionExpensive}` 

        const total = entriesSum - expensive;

        setTransactions(transactionsFormatted);
        setHighlightData({
            entries: {
                amount: toCurrency(entriesSum),
                lastTransaction: lastTransactionEntries
                    ? `??ltima sa??da dia ${lastTransactionEntries}`
                    : "N??o h?? transa????es"
            },
            expensives: {
                amount: toCurrency(expensive),
                lastTransaction: lastTransactionExpensive
                    ? `??ltima sa??da dia ${lastTransactionExpensive}`
                    : "N??o h?? transa????es"
            },
            total: {
                amount: toCurrency(total),
                lastTransaction: totalInterval
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
                                <S.Photo source={{ uri: user.picture }} />
                                <S.User>
                                    <S.UserGreeting>
                                        Ol??,
                                    </S.UserGreeting>
                                    <S.UserName>
                                        {user.name}
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
                            title="Sa??das"
                            amount={highlightData.expensives.amount}
                            lastTransaction={highlightData.expensives.lastTransaction}
                        />
                        <HighlightCard
                            type="total"
                            title="Total"
                            amount={highlightData.total.amount}
                            //TODO retirar essa data fixa
                            lastTransaction="1 a 26 de maio de 2022"
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