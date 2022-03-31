import * as S from "./styles";

import * as Yup from "yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import { CategorySelect } from "../CategorySelect";
import { Input } from "../../components/Forms/Input";
import { InputForm } from "../../components/Forms/InputForm";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";



export type CategoryProps = {
    key: string;
    name: string;
}

type FormData = {
    [name: string]: any
}

const INITIAL_CATEGORY_STATE = {
    key: "category",
    name: "categoria",
}

type transactionTypeProps = "up" | "down" | "";

const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatorio"),
    amount: Yup.number().typeError("Informe um valor númerico").positive().required("Preço é obrigatório")
})

export const Register = () => {

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState<CategoryProps>(INITIAL_CATEGORY_STATE);
    const [transactionType, setTransactionType] = useState<transactionTypeProps>("");

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

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

    const handleRegister = (form: FormData) => {

        if (!transactionType) {
            return Alert.alert("Selecione o tipo da transação")
        }

        if (category.key === "category") {
            return Alert.alert("Selecione a categoria")
        }


        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <S.Container>
                <S.Header>
                    <S.Title>Cadastro</S.Title>
                </S.Header>

                <S.Form>
                    <S.Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </S.Fields>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />

                </S.Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCateCategory={handleCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </S.Container>
        </TouchableWithoutFeedback>

    )
}