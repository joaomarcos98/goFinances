import React from "react";
import * as S from "./styles"


type CategoryProps = {
    name: string;
    icon: string;
}

export type TransactionDataProps = {
    type: "positive" | "negative"
    title: string;
    amount: string;
    category: CategoryProps
    date: string;
}

type TransactionCardProps = {
    data: TransactionDataProps
};

export const TransactionCard = ({ data }: TransactionCardProps) => {

    const { title, amount, category, date, type } = data;

    return (
        <S.Container>
            <S.Title>{title}</S.Title>

            <S.Amount type={type}>
                {type === "negative" && "- "}
                {amount}
            </S.Amount>

            <S.Footer>
                <S.Category>
                    <S.Icon name={category.icon} />
                    <S.CategoryName>{category.name}</S.CategoryName>
                </S.Category>
                <S.Date>{date}</S.Date>
            </S.Footer>
        </S.Container>
    )
}