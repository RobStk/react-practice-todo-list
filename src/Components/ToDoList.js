import React from "react";
import GlobalStyle from "./Styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import darkTheme from "./Styles/dark-theme";
import ToDoListStyle from "./Styles/ToDoListStyle";
import TasksListContainer from "./TasksListContainer";
import HeaderStyle from "./Styles/HeaderStyle";
import TasksAdder from "./TasksAdder";
import Timer from "./Timer";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.theme = darkTheme;
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.tasks = [
            {
                id: "001",
                title: "Awsome Task 1",
                done: true
            },
            {
                id: "002",
                title: "Awsome Task 2",
                done: false
            }
        ];
    }

    handleTaskAdd(taskData) {
        console.log("Dodano nowe zadanie: ", taskData);
    }

    render() {
        return (
            <>
                <ThemeProvider theme={this.theme}>
                    <GlobalStyle backgroundColor={this.theme.colors.background.primary} />
                    <ToDoListStyle>
                        <div>
                            <HeaderStyle data-style="HeaderStyle">
                                <TasksAdder onTaskAdd={this.handleTaskAdd} />
                                <Timer />
                            </HeaderStyle>
                            <TasksListContainer tasksArr={[...this.tasks]} />
                        </div>
                    </ToDoListStyle>
                </ThemeProvider>
            </>
        )
    }
}

export { ToDoList };