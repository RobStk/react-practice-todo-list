import '@testing-library/jest-dom';
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import SortByPanel from "../SortByPanel";

describe('SortByPanel', () => {
    afterEach(cleanup);

    const options = ['opt1', 'opt2'];

    it('should handle expansion', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <SortByPanel
                    sortOptions={options}
                    sortingProp={options[0]}
                />
            </ThemeProvider>
        );

        let dropDownButton = screen.getByRole('button');
        let menuOptions = screen.queryAllByRole('button');

        // Default option
        expect(dropDownButton.textContent).toBe('opt1');
        // List should not be displayed
        expect(menuOptions.length).toBe(1);

        userEvent.click(dropDownButton);

        const buttons = screen.queryAllByRole('button');
        dropDownButton = buttons[0];
        menuOptions = screen.queryAllByRole('button');

        // Default option
        expect(dropDownButton.textContent).toBe('opt1');
        // List should be displayed
        expect(menuOptions.length).toBe(3);

        userEvent.click(screen.getAllByRole('button')[0]);

        dropDownButton = buttons[0];
        menuOptions = screen.queryAllByRole('button');

        // Default option is the same
        expect(dropDownButton.textContent).toBe('opt1');
        // List should not be displayed
        expect(menuOptions.length).toBe(1);
    });

    it('should handle selecting path', () => {
        let selectedOption = null;
        function optionSelectTest(option) {
            selectedOption = option;
        }

        render(
            <ThemeProvider theme={darkTheme}>
                <SortByPanel
                    sortOptions={options}
                    sortingProp={options[0]}
                    onOptionSelect={optionSelectTest}
                />
            </ThemeProvider>
        );

        let dropDownButton = screen.getByRole('button');
        let menuOptions = screen.queryAllByRole('button');

        // Default option
        expect(dropDownButton.textContent).toBe('opt1');
        // List should not be displayed
        expect(menuOptions.length).toBe(1);

        userEvent.click(dropDownButton);

        const buttons = screen.queryAllByRole('button');
        dropDownButton = buttons[0];
        menuOptions = screen.queryAllByRole('button');

        // Default option
        expect(dropDownButton.textContent).toBe('opt1');
        // List should be displayed
        expect(menuOptions.length).toBe(3);

        const option = screen.getByText('opt2');
        userEvent.click(option);

        dropDownButton = screen.getByRole('button');
        menuOptions = screen.queryAllByRole('button');

        // List should not be displayed
        expect(menuOptions.length).toBe(1);
        // The selected option should now be the default
        expect(selectedOption).toBe('opt2');
    });
})