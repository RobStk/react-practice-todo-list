import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import TaskIndicator from "../TaskIndicator";

describe("TaskIndicator", () => {
    afterEach(cleanup);

    it("should handle click", () => {
        const handleClickTestFunction = jest.fn();
        render(
            <ThemeProvider theme={darkTheme}>
                <TaskIndicator
                    onClick={handleClickTestFunction}
                />
            </ThemeProvider>
        )
        userEvent.click(screen.getByTestId("TaskIndicator"));
        expect(handleClickTestFunction).toBeCalled();
    });

    it("should handle mouse enter", () => {
        const handleMouseEnterTestFunction = jest.fn();
        render(
            <ThemeProvider theme={darkTheme}>
                <TaskIndicator
                    onMouseEnter={handleMouseEnterTestFunction}
                />
            </ThemeProvider>
        )
        userEvent.hover(screen.getByTestId("TaskIndicator"));
        expect(handleMouseEnterTestFunction).toBeCalled();
    });

    it("should handle mouse leave", () => {
        const handleMouseLeaveTestFunction = jest.fn();
        render(
            <ThemeProvider theme={darkTheme}>
                <TaskIndicator
                    onMouseLeave={handleMouseLeaveTestFunction}
                />
            </ThemeProvider>
        )
        userEvent.hover(screen.getByTestId("TaskIndicator"));
        userEvent.unhover(screen.getByTestId("TaskIndicator"));
        expect(handleMouseLeaveTestFunction).toBeCalled();
    });

    it("should handle key down", () => {
        const handleKeyDownTestFunction = jest.fn();
        render(
            <ThemeProvider theme={darkTheme}>
                <TaskIndicator
                    onKeyDown={handleKeyDownTestFunction}
                />
            </ThemeProvider>
        )
        fireEvent.keyDown(screen.getByTestId("TaskIndicator"));
        expect(handleKeyDownTestFunction).toBeCalled();
    });
})