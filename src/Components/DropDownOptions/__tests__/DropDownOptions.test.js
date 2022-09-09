import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import DropDownOptions from "../DropDownOptions";

describe('DropDownOptions options', () => {

    const options = ['opt1', 'opt2', 'opt3'];

    afterEach(cleanup);

    it('should be all buttons', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <DropDownOptions
                    options={options}
                />
            </ThemeProvider>
        );

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(3);
    });

    it('should be clickable', () => {
        let clickedTextContent = '';
        function onClick(txt) {
            clickedTextContent = txt;
        }
        render(
            <ThemeProvider theme={darkTheme}>
                <DropDownOptions
                    options={options}
                    onClick={onClick}
                />
            </ThemeProvider>
        );

        const buttons = screen.getAllByRole('button');
        const button = buttons[1];
        fireEvent.click(button);
        expect(button.textContent).toBe(clickedTextContent);
    });

    it('should not be visible', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <DropDownOptions
                    options={options}
                    display='none'
                />
            </ThemeProvider>
        );
        const buttons = screen.queryAllByRole('button');
        expect(buttons.length).toBe(0);
    });
})