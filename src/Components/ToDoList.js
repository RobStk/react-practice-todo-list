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
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        return (
            <>
                <ThemeProvider theme={this.theme}>
                    <GlobalStyle backgroundColor={this.theme.colors.background.primary} />
                    <ToDoListStyle>
                        <HeaderStyle data-style="HeaderStyle">
                            <TasksAdder onTaskAdd={this.addTask} />
                            <Timer />
                        </HeaderStyle>
                        <TasksListContainer
                            tasksArr={[...this.state.tasks]}
                            onDelete={this.deleteTask}
                            onTaskChange={this.updateTask}
                        />
                    </ToDoListStyle>
                </ThemeProvider>
            </>
        )
    }

    async getTasks() {
        const response = await fetch("http://localhost:5000/tasks");
        console.log([response]);
        const tasks = await response.json();
        this.setState({
            tasks: tasks
        });
    }

    setTasks(tasks) {
        //TODO json-server
        this.setState({
            tasks: tasks
        })
    }

    addTask(taskData) {
        console.log("Dodano nowe zadanie: ", taskData);
        const newTask = {
            id: "003",
            title: taskData,
            done: false
        }
        let tasks = [...this.state.tasks, newTask];
        this.setTasks(tasks);
    }

    updateTask(updatedTask) {
        const id = updatedTask.id;
        let tasks = [...this.state.tasks];
        let task = tasks.find((task) => task.id === id);
        tasks = tasks.filter((task) => task.id !== id);
        task = { ...task, ...updatedTask };
        tasks.push(task);
        this.setTasks(tasks);
    }

    deleteTask(id) {
        const tasks = this.state.tasks.filter((task) => (task.id !== id));
        this.setTasks(tasks);
    }
}

export { ToDoList };