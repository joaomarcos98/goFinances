import { render } from "@testing-library/react-native"
import React from "react"
import { ThemeProvider } from "styled-components/native"
import { HighlightCard } from "."
import theme from "../../global/styles/theme"

type ProviderProps = {
    children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
)

describe("HighlightCard component", () => {
    it("should be renders correctly", () => {
        const { getByTestId } = render(<HighlightCard
            amount="0"
            lastTransaction="0"
            title="any_title"
            type="up"
        />, {
            wrapper: Providers
        })

        const container = getByTestId(/highlight-card-container/);

        expect(container).toBeTruthy();
    })

    it("should be type top render with orange color", () => {
        const { getByTestId } = render(<HighlightCard
            amount="0"
            lastTransaction="0"
            title="any_title"
            type="total"
        />, {
            wrapper: Providers
        })

        const container = getByTestId(/highlight-card-container/);

        expect(container.props.style[0].backgroundColor)
            .toEqual(theme.colors.secondary);

    })
})