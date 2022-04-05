import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";


import * as S from "./styles"
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";


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

    const [totalByCaegories, setTotalByCaegories] = useState<CategoryData[]>([]);
    const theme = useTheme();

    const loadData = async () => {
        const dataKey = "@goFinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];
        const expensives = responseFormatted
            .filter((expensive: TransactionData) => expensive.type === "negative")

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
    }

    useEffect(() => {
        loadData();
    }, [])

    useFocusEffect(useCallback(() => {
        loadData()
    }, []))

    return (
        <S.Container>
            <S.Header>
                <S.Title>
                    Resumo por categoria
                </S.Title>
            </S.Header>

            <S.Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight()
                }}
            >

                <S.MonthSelect>
                    <S.MonthSelectButton>
                        <S.MonthSelectIcon name="chevron-left" />
                    </S.MonthSelectButton>

                    <S.Month>Abril</S.Month>

                    <S.MonthSelectButton>
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


        </S.Container>
    )
}