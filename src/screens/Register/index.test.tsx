import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import { Register } from ".";
import theme from "../../global/styles/theme";
import { ThemeProvider } from "styled-components/native";

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

describe("Register Screen", () => {
    it("should be open category modal when user click on the category button", () => {
        const { getByTestId } = render(<Register />, {
            wrapper: Providers
        })

        const categoryModal = getByTestId(/category-modal/);

        const categoryButton = getByTestId(/category-button/);

        fireEvent.press(categoryButton);

        expect(categoryModal.props.visible).toBeTruthy();
    })
})