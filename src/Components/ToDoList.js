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
import Time from "../utilities/time";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.query = new Connection(props.dbPath);
        this.theme = darkTheme;

        this.tempIdCnt = 0;

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
        tasks.forEach(task => {
            if (task.tempId) delete task.tempId;
        });
        this.setTasks(tasks);
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
        newTask.tempId = "tempId" + this.tempIdCnt;
        this.tempIdCnt++;
        const tasks = [...this.state.tasks, newTask];
        this.setTasks(tasks);
        await this.query.post(newTask);
        this.getTasks();
    }

    // ------------------------

    async updateTask(updatedTask) {
        const id = updatedTask.id;
        let tasks = [...this.state.tasks];
        let task = tasks.find((task) => task.id === id);
        tasks = tasks.filter((task) => task.id !== id);
        task = { ...task, ...updatedTask };
        const timer = new Time();
        task.modificationDate = timer.getFullTimeRaw();
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
        const timer = new Time();
        const creationDate = timer.getFullTimeRaw();
        const modificationDate = creationDate;

        return {
            title: "",
            done: false,
            creationDate: creationDate,
            modificationDate: modificationDate
        };
    }
}

export { ToDoList };