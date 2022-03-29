import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import * as S from "./styles"


type Category = {
    key: string
    name: string
}

type CategorySelectProps = {
    category: string
    setCateCategory: (category: Category) => void
    closeSelectCategory: () => void
}

export const CategorySelect = ({
    category,
    setCateCategory,
    closeSelectCategory
}: CategorySelectProps) => {
    return (
        <S.Container>
            <S.Header>
                <S.Title>Categoria</S.Title>
            </S.Header>

            <FlatList
                data={categories}
                style={{ flex: 1, width: "100%" }}
                keyExtractor={item => item.key}
                renderItem={({ item: { name, icon } }) => (
                    <S.Category>
                        <S.Icon name={icon} />
                        <S.Name>{name}</S.Name>
                    </S.Category>
                )}
                ItemSeparatorComponent={() => <S.Separator />}
            />

            <S.Footer>
                <Button title="Selecionar" />
            </S.Footer>

        </S.Container>
    )
}
