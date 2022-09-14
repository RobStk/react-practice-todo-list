import '@testing-library/jest-dom';
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import SortDirectionButton from "../SortDirectionButton";

describe('SortDirectionButton', () => {
    afterEach(cleanup);

    it('should pass the display mode', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <SortDirectionButton
                    display={'none'}
                />
            </ThemeProvider>
        );

        expect(screen.queryAllByRole('button').length).toBe(0);
    });

    it('should handle click', () => {

        let isClicked = false;

        function clickTest() {
            isClicked = true;
        }

        render(
            <ThemeProvider theme={darkTheme}>
                <SortDirectionButton
                    onClick={clickTest}
                />
            </ThemeProvider>
        );

        userEvent.click(screen.getByRole('button'));
        expect(isClicked).toBeTruthy();
    });
})