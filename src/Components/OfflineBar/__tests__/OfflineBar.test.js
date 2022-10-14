import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import OfflineBar from "../OfflineBar";

describe('OfflineBar', () => {
    afterEach(cleanup);

    it('should handle provided reconnection function', () => {
        let reconnect = false;
        function testFunction() {
            reconnect = true;
        }

        render(
            <ThemeProvider theme={darkTheme}>
                <OfflineBar onTryAgain={testFunction} />
            </ThemeProvider>
        )

        const button = screen.getByRole('button');
        userEvent.click(button);

        expect(reconnect).toBe(true);
    })
})