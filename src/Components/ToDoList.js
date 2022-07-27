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
        //TODO Wspólna data
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        let hour = date.getHours();
        if (hour < 10) hour = "0" + hour;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let seconds = date.getSeconds();
        if (seconds < 10) seconds = "0" + seconds;
        let miliseconds = date.getMilliseconds();
        if (miliseconds < 10) miliseconds = "0" + miliseconds;
        if (miliseconds < 100) miliseconds = "0" + miliseconds;
        const creationDate = year.toString() + month.toString() + day.toString() + hour.toString() + minutes.toString() + seconds.toString() + miliseconds.toString();
        return {
            title: "",
            done: false,
            creationDate: creationDate
        };
    }
}

export { ToDoList };