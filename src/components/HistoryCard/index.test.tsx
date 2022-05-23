import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { HistoryCard } from ".";
import theme from "../../global/styles/theme";


type ProviderProps = {
    children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
)

describe("HistoryCard component", () => {
    it("should be render's correctly", () => {
        const { getByTestId } = render(<HistoryCard
            amount="0"
            title="any_title"
            color={theme.colors.primary}
        />, {
            wrapper: Providers
        });

        const container = getByTestId(/history-card-container/);

        expect(container.props.style[0].borderLeftColor)
            .toEqual(theme.colors.primary)
    })
})