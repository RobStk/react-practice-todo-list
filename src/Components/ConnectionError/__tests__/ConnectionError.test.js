import '@testing-library/jest-dom';
import { cleanup, render, screen } from "@testing-library/react"
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import ConnectionError from "../ConnectionError";

describe('Connection error message', () => {
    afterAll(cleanup);

    const tempConnectionErrorInstance = new ConnectionError();
    const defaultErrorAdvice = tempConnectionErrorInstance.defaultErrorAdvice;
    const defaultErrorDescription = tempConnectionErrorInstance.defaultErrorDescription;

    it('should display the default advice', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <ConnectionError />
            </ThemeProvider>
        )
        expect(screen.getByText(defaultErrorAdvice)).toBeInTheDocument();
    })

    it('should display the default description', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <ConnectionError />
            </ThemeProvider>
        )
        expect(screen.getByText(defaultErrorDescription)).toBeInTheDocument();
    })

    it('should display the passed advice', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <ConnectionError errorAdvice='test errorAdvice' />
            </ThemeProvider>
        )
        expect(screen.getByText('test errorAdvice')).toBeInTheDocument();
    })

    it('should display the passed description', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <ConnectionError description='test description' />
            </ThemeProvider>
        )
        expect(screen.getByText('test description')).toBeInTheDocument();
    })
})