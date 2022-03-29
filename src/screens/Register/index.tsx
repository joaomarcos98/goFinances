import React, { useState } from "react";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import * as S from "./styles";


type transactionTypeProps = "up" | "down" | ""

export const Register = () => {

    const [transactionType, setTransactionType] = useState<transactionTypeProps>("");

    const handleTransactionTypeSelect = (type: "up" | "down") => {
        setTransactionType(type)
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
                </S.Fields>
                <Button title="Enviar" />
            </S.Form>
        </S.Container>
    )
}