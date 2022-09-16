import '@testing-library/jest-dom';
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from "styled-components";
import darkTheme from "../../../Styles/dark-theme";
import Task from "../Task";

describe("Every Task", () => {
    afterEach(cleanup);

    it('should display the provided content', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    content='test content'
                />
            </ThemeProvider>
        );

        expect(screen.getByText('test content')).toBeInTheDocument();
    });

    it('should not display buttons on default', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    content='test content'
                />
            </ThemeProvider>
        );

        const editButton = screen.getByTestId('editButton');
        const calendarButton = screen.getByTestId('calendarButton');
        const deleteButton = screen.getByTestId('deleteButton');
        const acceptButton = screen.getByTestId('acceptButton');
        const cancelButton = screen.getByTestId('cancelButton');
        expect(editButton).not.toBeVisible();
        expect(calendarButton).not.toBeVisible();
        expect(deleteButton).not.toBeVisible();
        expect(acceptButton).not.toBeVisible();
        expect(cancelButton).not.toBeVisible();
    });

    it('should display edit button on hover', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    content='test content'
                />
            </ThemeProvider>
        );

        const editButton = screen.getByTestId('editButton');
        userEvent.hover(screen.getByText('test content'));
        expect(editButton).toBeVisible();
        userEvent.unhover(screen.getByText('test content'));
        expect(editButton).not.toBeVisible();
    });

    it('should display calendar button on hover', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    content='test content'
                />
            </ThemeProvider>
        );

        const calendarButton = screen.getByTestId('calendarButton');
        userEvent.hover(screen.getByText('test content'));
        expect(calendarButton).toBeVisible();
        userEvent.unhover(screen.getByText('test content'));
        expect(calendarButton).not.toBeVisible();
    });

    it('should display delete button on hover', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    content='test content'
                />
            </ThemeProvider>
        );

        const deleteButton = screen.getByTestId('deleteButton');
        userEvent.hover(screen.getByText('test content'));
        expect(deleteButton).toBeVisible();
        userEvent.unhover(screen.getByText('test content'));
        expect(deleteButton).not.toBeVisible();
    });

    it('should not display edit button on edit mode', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    content='test content'
                />
            </ThemeProvider>
        );

        const editButton = screen.getByTestId('editButton');
        userEvent.click(editButton);
        expect(editButton).not.toBeVisible();
        userEvent.unhover(screen.getByText('test content'));
        expect(editButton).not.toBeVisible();
    });

    it('should display accept button on edit mode', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task />
            </ThemeProvider>
        );

        const editButton = screen.getByTestId('editButton');
        userEvent.click(editButton);
        const acceptButton = screen.getByTestId('acceptButton');
        expect(acceptButton).toBeVisible();
    });

    it('should display cancel button on edit mode', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task />
            </ThemeProvider>
        );

        const editButton = screen.getByTestId('editButton');
        userEvent.click(editButton);
        const cancelButton = screen.getByTestId('cancelButton');
        expect(cancelButton).toBeVisible();
    });

    it("should not display editor's button after accept", () => {
        const onTaskChangeMock = jest.fn()

        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    onTaskChange={onTaskChangeMock}
                />
            </ThemeProvider>
        );

        const editButton = screen.getByTestId('editButton');
        userEvent.click(editButton);
        const acceptButton = screen.getByTestId('acceptButton');
        const cancelButton = screen.getByTestId('cancelButton');

        userEvent.click(acceptButton);
        expect(acceptButton).not.toBeVisible();
        expect(cancelButton).not.toBeVisible();
    });

    it("should not display editor's button after cancel", () => {
        const onTaskChangeMock = jest.fn()

        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    onTaskChange={onTaskChangeMock}
                />
            </ThemeProvider>
        );

        const editButton = screen.getByTestId('editButton');
        userEvent.click(editButton);
        const acceptButton = screen.getByTestId('acceptButton');
        const cancelButton = screen.getByTestId('cancelButton');

        userEvent.click(cancelButton);
        expect(acceptButton).not.toBeVisible();
        expect(cancelButton).not.toBeVisible();
    });

    it("should not display editor's button after unfocus", () => {
        const onTaskChangeMock = jest.fn()

        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    onTaskChange={onTaskChangeMock}
                />
            </ThemeProvider>
        );

        const editButton = screen.getByTestId('editButton');
        userEvent.click(editButton);
        const acceptButton = screen.getByTestId('acceptButton');
        const cancelButton = screen.getByTestId('cancelButton');

        userEvent.click(document.body);
        expect(acceptButton).not.toBeVisible();
        expect(cancelButton).not.toBeVisible();
    });
});

describe('Undone Task', () => {
    afterEach(cleanup);

    it("should display undone icon on default", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    done={false}
                />
            </ThemeProvider>
        );
        expect(screen.getByTestId("undoneIcon")).toBeInTheDocument();
    });

    it("should not display done icon on default", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    done={false}
                />
            </ThemeProvider>
        );
        expect(screen.queryByTestId("doneIcon")).not.toBeInTheDocument();
    });

    it("should display done icon on hover", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    done={false}
                />
            </ThemeProvider>
        );
        userEvent.hover(screen.getByTestId("undoneIcon"));
        expect(screen.getByTestId("doneIcon")).toBeInTheDocument();
        expect(screen.queryByTestId("undoneIcon")).not.toBeInTheDocument();
    });

    it("should display undone icon after hover", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    done={false}
                />
            </ThemeProvider>
        );
        userEvent.hover(screen.getByTestId("undoneIcon"));
        userEvent.unhover(screen.getByTestId("doneIcon"));
        expect(screen.getByTestId("undoneIcon")).toBeInTheDocument();
        expect(screen.queryByTestId("doneIcon")).not.toBeInTheDocument();
    });
});

describe("Done Task", () => {
    afterEach(cleanup);

    it("should display done icon on default", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    done={true}
                />
            </ThemeProvider>
        );
        expect(screen.getByTestId("doneIcon")).toBeInTheDocument();
    });

    it("should not display undone icon on default", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    done={true}
                />
            </ThemeProvider>
        );
        expect(screen.queryByTestId("undoneIcon")).not.toBeInTheDocument();
    });

    it("should display undone icon on hover", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    done={true}
                />
            </ThemeProvider>
        );
        userEvent.hover(screen.getByTestId("doneIcon"));
        expect(screen.getByTestId("undoneIcon")).toBeInTheDocument();
        expect(screen.queryByTestId("doneIcon")).not.toBeInTheDocument();
    });

    it("should display done icon after hover", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Task
                    done={true}
                />
            </ThemeProvider>
        );
        userEvent.hover(screen.getByTestId("doneIcon"));
        userEvent.unhover(screen.getByTestId("undoneIcon"));
        expect(screen.getByTestId("doneIcon")).toBeInTheDocument();
        expect(screen.queryByTestId("undoneIcon")).not.toBeInTheDocument();
    });
});