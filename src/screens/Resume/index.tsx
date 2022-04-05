import * as S from "./styles"
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { ActivityIndicator } from "react-native";


type TransactionData = {
    id: string;
    name: string;
    date: string;
    amount: string;
    category: string;
    type: "positive" | "negative";
}

type CategoryData = {
    key: string;
    name: string;
    color: string;
    percent: string
    totalNumber: number;
    totalFormated: string;
}

export const Resume = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCaegories, setTotalByCaegories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    const handleChangeDate = (action: "next" | "prev") => {
        // setIsLoading(true)
        if (action === "next") {
            const newDate = selectedDate
                .setMonth(selectedDate.getMonth() + 1)
            setSelectedDate(new Date(newDate))
        } else {
            const newDate = selectedDate
                .setMonth(selectedDate.getMonth() - 1)
            setSelectedDate(new Date(newDate))
        }
    }

    const loadData = async () => {
        const dataKey = "@goFinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];
        const expensives = responseFormatted
            .filter((expensive: TransactionData) =>
                expensive.type === "negative" &&
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
            )

        const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
            return acumullator += Number(expensive.amount);
        }, 0);

        const totalByCategory: CategoryData[] = []

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })

            if (categorySum) {
                const total = categorySum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

                totalByCategory.push({
                    percent,
                    key: category.key,
                    name: category.name,
                    totalFormated: total,
                    color: category.color,
                    totalNumber: categorySum
                })
            }
        })
        setTotalByCaegories(totalByCategory)
        setIsLoading(false)
    }

    useEffect(() => {
        loadData();
    }, [selectedDate])

    useFocusEffect(useCallback(() => {
        loadData()
    }, []))

    const month = Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric"
    }).format(selectedDate);

    const monthFormated = month[0].toUpperCase() + month.slice(1);

    return (
        <S.Container>
            <S.Header>
                <S.Title>
                    Resumo por categoria
                </S.Title>
            </S.Header>
            {
                isLoading
                    ? <S.LoadContainer>
                        <ActivityIndicator color={theme.colors.primary} />
                    </S.LoadContainer>
                    :

                    <S.Content
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: useBottomTabBarHeight()
                        }}
                    >
                        <S.MonthSelect>
                            <S.MonthSelectButton onPress={() => handleChangeDate("prev")}>
                                <S.MonthSelectIcon name="chevron-left" />
                            </S.MonthSelectButton>

                            <S.Month>{
                                monthFormated
                            }</S.Month>

                            <S.MonthSelectButton onPress={() => handleChangeDate("next")}>
                                <S.MonthSelectIcon name="chevron-right" />
                            </S.MonthSelectButton>

                        </S.MonthSelect>

                        <S.ChartContainer>
                            <VictoryPie
                                data={totalByCaegories}
                                colorScale={totalByCaegories
                                    .map(category => category.color)}
                                style={{
                                    labels: {
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        fill: theme.colors.shape
                                    }
                                }}
                                labelRadius={65}
                                x="percent"
                                y="totalNumber"
                            />
                        </S.ChartContainer>
                        {
                            totalByCaegories.map(category => (
                                <HistoryCard
                                    key={category.name}
                                    title={category.name}
                                    color={category.color}
                                    amount={category.totalFormated}

                                />
                            ))
                        }
                    </S.Content>
            }


        </S.Container>
    )
}