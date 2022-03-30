import { Modal } from "react-native";
import React, { useState } from "react";

import { CategorySelect } from "../CategorySelect";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import * as S from "./styles";


export type CategoryProps = {
    key: string;
    name: string;
}

const INITIAL_CATEGORY_STATE = {
    key: "category",
    name: "categoria",
}

type transactionTypeProps = "up" | "down" | "";

export const Register = () => {

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState<CategoryProps>(INITIAL_CATEGORY_STATE);
    const [transactionType, setTransactionType] = useState<transactionTypeProps>("");

    const handleTransactionTypeSelect = (type: "up" | "down") => {
        setTransactionType(type)
    };

    const handleCloseSelectCategoryModal = () => {
        setCategoryModalOpen(false);
    }

    const handleOpenSelectCategoryModal = () => {
        setCategoryModalOpen(true);
    }

    const handleCategory = (category: CategoryProps) => {
        setCategory(category)
    }

    return (
        <S.Container>
            <S.Header>
                <S.Title>Cadastro</S.Title>
            </S.Header>

            <S.Form>
                <S.Fields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                    />
                    <S.TransactionTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            isActive={transactionType === "up"}
                            onPress={() => handleTransactionTypeSelect("up")}
                        />
                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            isActive={transactionType === "down"}
                            onPress={() => handleTransactionTypeSelect("down")}
                        />
                    </S.TransactionTypes>
                    <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
                </S.Fields>
                <Button title="Enviar" />
            </S.Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCateCategory={handleCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}

                />
            </Modal>
        </S.Container>
    )
}