import '@testing-library/jest-dom';
import { cleanup, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import Button from '../Button';

describe('Button', () => {
    afterEach(cleanup);

    it('should be the right color', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Button backgroundColor={'rgb(18, 52, 86)'} />
            </ThemeProvider>)
        expect(screen.getByRole('button')).toHaveStyle('background-color: rgb(18, 52, 86)');
    });
})