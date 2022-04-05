import * as S from "./styles";

import uuid from "react-native-uuid";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CategorySelect } from "../CategorySelect";
import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";


export type CategoryProps = {
    key: string;
    name: string;
}

type FormData = {
    [name: string]: any
}

type transactionTypeProps = "positive" | "negative" | "";

type NavigationProps = {
    navigate: (screen: string) => void
}

const INITIAL_CATEGORY_STATE = {
    key: "category",
    name: "categoria",
}

const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatorio"),
    amount: Yup.number().typeError("Informe um valor númerico").positive("Valor não pode ser negativo").required("Preço é obrigatório")
})

export const Register = () => {

    const dataKey = "@goFinances:transactions";

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState<CategoryProps>(INITIAL_CATEGORY_STATE);
    const [transactionType, setTransactionType] = useState<transactionTypeProps>("");

    const navigation = useNavigation<NavigationProps>();

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleTransactionTypeSelect = (type: "positive" | "negative") => {
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

    const handleRegister = async (form: FormData) => {

        if (!transactionType) {
            return Alert.alert("Selecione o tipo da transação")
        }

        if (category.key === "category") {
            return Alert.alert("Selecione a categoria")
        }

        const newTransactions = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {

            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            
            const dataFormatted = [
                ...currentData,
                newTransactions
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType("");
            setCategory({
                key: "category",
                name: "Categoria"
            });

            navigation.navigate("Listagem")

        } catch (err) {
            console.log(err);
            Alert.alert("Não foi possível salvar.");
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const data = await AsyncStorage.getItem(dataKey)
            console.log(data);
        }
        loadData()

    }, [])

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
                                isActive={transactionType === "positive"}
                                onPress={() => handleTransactionTypeSelect("positive")}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                isActive={transactionType === "negative"}
                                onPress={() => handleTransactionTypeSelect("negative")}
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