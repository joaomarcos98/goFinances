import { render } from "@testing-library/react-native"
import { ThemeProvider } from "styled-components/native"
import theme from "../../global/styles/theme"
import React from "react"
import { SignInSocialButton } from "."
import GoogleIcon from "../../assets/google.svg";

type ProviderProps = {
    children: React.ReactNode
}

export const Providers = ({ children }: ProviderProps) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);


describe("SignIn Social Button component", () => {
    it("should be render's correctly", () => {
        const { getByTestId } = render(<SignInSocialButton
            title="any_title"
            icon={GoogleIcon}
            testID="signin-social-button"
        />, {
            wrapper: Providers
        });

        const container = getByTestId(/signin-social-button/);

        expect(container).toBeTruthy();
    })
})