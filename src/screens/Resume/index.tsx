import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as S from "./styles"
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";


type TransactionData = {
    id: string;
    type: "positive" | "negative";
    name: string;
    amount: string;
    category: string;
    date: string;
}

type CategoryData = {
    key: string;
    name: string;
    total: string;
    color: string;
}

export const Resume = () => {

    const [totalByCaegories, setTotalByCaegories] = useState<CategoryData[]>([]);

    const loadData = async () => {
        const dataKey = "@goFinances:transactions";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted
            .filter((expensive: TransactionData) => expensive.type === "negative")

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
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total,
                })
            }
        })
        setTotalByCaegories(totalByCategory)
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <S.Container>
            <S.Header>
                <S.Title>
                    Resumo por categoria
                </S.Title>
            </S.Header>

            <S.Content>
                {
                    totalByCaegories.map(category => (
                        <HistoryCard
                            key={category.name}
                            title={category.name}
                            color={category.color}
                            amount={category.total}

                        />
                    ))
                }
            </S.Content>


        </S.Container>
    )
}