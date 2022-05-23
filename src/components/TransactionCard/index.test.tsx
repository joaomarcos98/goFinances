import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { TransactionCard } from ".";
import theme from "../../global/styles/theme";


type ProviderProps = {
    children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

export type TransactionDataProps = {
    type: "positive" | "negative"
    name: string;
    amount: string;
    category: string;
    date: string;
}

const dataMock: TransactionDataProps = {
    type: "negative",
    name: "Joe Dohn",
    amount: "0",
    category: "any_category",
    date: "265956"
}

describe("Transaction Card Component", () => {
    it("should be render's correctly if negative type", () => {
        const { getByText , debug} = render(<TransactionCard
            data={dataMock}
        />, {
            wrapper: Providers
        })

        const name = getByText(/- 0/);

        expect(name).toBeTruthy();
    })
})