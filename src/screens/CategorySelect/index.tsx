import React from "react";
import { FlatList } from "react-native";
import { categories } from "../../utils/categories";
import * as S from "./styles"


type Category = {
    key: string
    name: string
}

type CategorySelectProps = {
    category: Category
    setCateCategory: (category: Category) => void
    closeSelectCategory: () => void
}

export const CategorySelect = ({
    category,
    setCateCategory,
    closeSelectCategory
}: CategorySelectProps) => {

    const handleCategorySelect = (category: Category) => {
        setCateCategory(category)
        closeSelectCategory()
    }

    return (
        <S.Container>
            <S.Header>
                <S.Title>Categoria</S.Title>
            </S.Header>

            <FlatList
                data={categories}
                style={{ flex: 1, width: "100%" }}
                keyExtractor={item => item.key}
                renderItem={({ item: { name, icon, key } }) => (
                    <S.Category
                        onPress={() => handleCategorySelect({ key, name })}
                        isActive={category.key === key}
                    >
                        <S.Icon name={icon} />
                        <S.Name>{name}</S.Name>
                    </S.Category>
                )}
                ItemSeparatorComponent={() => <S.Separator />}
            />
        </S.Container>
    )
}
