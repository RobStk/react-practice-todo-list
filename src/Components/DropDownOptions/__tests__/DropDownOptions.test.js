import '@testing-library/jest-dom';
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
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
        expect(screen.getAllByRole('button').length).toBe(3);
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
        userEvent.click(screen.getAllByRole('button')[1]);
        expect(screen.getAllByRole('button')[1].textContent).toBe(clickedTextContent);
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
        expect(screen.queryAllByRole('button').length).toBe(0);
    });
})