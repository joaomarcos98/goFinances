import React from "react";
import { categories } from "../../utils/categories";
import * as S from "./styles"


export type TransactionDataProps = {
    type: "positive" | "negative"
    name: string;
    amount: string;
    category: string;
    date: string;
}

type TransactionCardProps = {
    data: TransactionDataProps
};

export const TransactionCard = ({ data }: TransactionCardProps) => {

    const { name, amount, date, type } = data;
    const [category] = categories.filter(
        item => item.key === data.category
    );

    return (
        <S.Container>
            <S.Title>{name}</S.Title>

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