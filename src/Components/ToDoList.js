import React from "react";
import GlobalStyle from "./Styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import darkTheme from "./Styles/dark-theme";
import ToDoListStyle from "./Styles/ToDoListStyle";
import TasksListContainer from "./TasksListContainer";
import HeaderStyle from "./Styles/HeaderStyle";
import TasksAdder from "./TasksAdder";
import Timer from "./Timer";
import Connection from "../connection";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.query = new Connection(props.dbPath);
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

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    async getTasks() {
        const tasks = await this.query.get();
        this.setState({
            tasks: tasks
        });
    }

    // ------------------------

    setTasks(tasks) {
        this.setState({
            tasks: tasks
        });
    }

    // ------------------------

    async addTask(taskData) {
        const newTask = this.createTask();
        newTask.title = taskData.title;
        this.query.post(newTask);
        newTask.id = { ...newTask, id: "idPlaceholder" };
        let tasks = [...this.state.tasks, newTask];
        this.setTasks(tasks);
    }

    // ------------------------

    async updateTask(updatedTask) {
        const id = updatedTask.id;

        let tasks = [...this.state.tasks];
        let task = tasks.find((task) => task.id === id);
        tasks = tasks.filter((task) => task.id !== id);
        task = { ...task, ...updatedTask };
        tasks.push(task);
        this.setTasks(tasks);
        this.query.put(task);
    }

    // ------------------------

    async deleteTask(id) {
        const tasks = this.state.tasks.filter((task) => (task.id !== id));
        this.setTasks(tasks);
        this.query.delete(id);
    }

    // ------------------------

    createTask() {
        return {
            title: "",
            done: false
        };
    }
}

export { ToDoList };