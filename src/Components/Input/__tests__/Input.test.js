import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Input } from "../Input";
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import userEvent from "@testing-library/user-event";

describe('Input', () => {
    afterEach(cleanup);

    // ------------------------

    it('should have the correct properties', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Input
                    placeholder={'test placeholder'}
                    id={'testId'}
                    type={'search'}
                    value={'test value'}
                    autoComplete={'on'}
                />
            </ThemeProvider>
        );

        const input = screen.getByPlaceholderText('test placeholder');
        expect(input.id).toBe('testId');
        expect(input.type).toBe('search');
        expect(input.value).toBe('test value');
        expect(input.autocomplete).toBe('on');
    });

    // ------------------------

    it('should handle changes', () => {
        let changedValue = '';
        function handleChange(event) {
            changedValue = event.target.value;
        }
        const handleFocus = jest.fn();

        render(
            <ThemeProvider theme={darkTheme}>
                <Input
                    onChange={(event) => { handleChange(event) }}
                    onFocus={handleFocus}
                />
            </ThemeProvider>
        );
        const input = screen.getByRole('textbox');
        userEvent.type(input, 'change');
        expect(changedValue).toBe('change');
    });

    // ------------------------

    it('should handle focus/blur', () => {
        let testValue = '';
        function handleFocus() {
            testValue = 'focused value';
        }
        function handleBlur() {
            testValue = 'blurred value';
        }

        render(
            <ThemeProvider theme={darkTheme}>
                <Input
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </ThemeProvider>
        );
        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        expect(testValue).toBe('focused value');
        fireEvent.blur(input);
        expect(testValue).toBe('blurred value');
    });

    // ------------------------

    it('should handle keyDown', () => {
        let testValue = '';
        function handleKeyDown() {
            testValue = 'keyDown value';
        }

        render(
            <ThemeProvider theme={darkTheme}>
                <Input
                    onKeyDown={handleKeyDown}
                />
            </ThemeProvider>
        );
        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input);
        expect(testValue).toBe('keyDown value');
    });

    // ------------------------

});