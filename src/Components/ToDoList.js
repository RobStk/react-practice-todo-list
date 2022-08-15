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
import OfflineBar from "./OfflineBar";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.tasks = [];
        this.newTasks = [];
        this.query = new Connection(props.dbPath);
        this.theme = darkTheme;

        this.tempIdCnt = 0;

        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.state = {
            tasks: [],
            connectionError: false
        }
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        const tasks = this.state.tasks.length ? [...this.state.tasks] : [...this.tasks];
        const offlineDisplay = this.state.connectionError ? "" : 'none';
        return (
            <>
                <ThemeProvider theme={this.theme}>
                    <GlobalStyle backgroundColor={this.theme.colors.background.primary} />
                    <OfflineBar display={offlineDisplay} />
                    <ToDoListStyle>
                        <HeaderStyle data-style="HeaderStyle">
                            <TasksAdder onTaskAdd={this.addTask} />
                            <Timer />
                        </HeaderStyle>
                        <TasksListContainer
                            tasksArr={tasks}
                            onDelete={this.deleteTask}
                            onTaskChange={this.updateTask}
                            connectionError={this.state.connectionError}
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
        try {
            const tasks = await this.query.get();
            tasks.forEach(task => {
                if (task.tempId) delete task.tempId;
            });
            this.setTasks(tasks);
            this.setState({ connectionError: false });
        }
        catch (error) {
            this.setState({ connectionError: true });
            this.setTasks([]);
        }
    }

    // ------------------------

    setTasks(tasks) {
        if (tasks.length) this.setState({ tasks: tasks });
        if (!tasks.length) this.setState({ tasks: this.tasks })
    }

    // ------------------------

    async addTask(taskData) {
        try {
            const newTask = this.createTask();
            newTask.content = taskData.content;
            newTask.tempId = "tempId" + this.tempIdCnt;
            this.tempIdCnt++;
            this.newTasks.push(newTask);
            this.tasks = [...this.state.tasks, newTask];
            this.setTasks(this.tasks);
            // await this.query.post(newTask);
            while (this.newTasks.length) {
                await this.query.post(this.newTasks[0]);
                this.newTasks = this.newTasks.slice(1);
            }
            this.setState({ connectionError: false });
        }
        catch (error) {
            this.setState({ connectionError: true });
        }
        this.getTasks();
    }

    // ------------------------

    async updateTask(updatedTask) {
        try {
            const id = updatedTask.id;
            let tasks = [...this.state.tasks];
            let task = tasks.find((task) => task.id === id);
            tasks = tasks.filter((task) => task.id !== id);
            task = { ...task, ...updatedTask };
            const timer = new Time();
            task.modificationDate = timer.getFullTimeRaw();
            tasks.push(task);
            this.setTasks(tasks);
            const response = await this.query.put(task);
            if (!response) throw new Error();
            this.setState({ connectionError: false });
        }
        catch (error) {
            this.setState({ connectionError: true });
        }
    }

    // ------------------------

    async deleteTask(id) {
        try {
            const tasks = this.state.tasks.filter((task) => (task.id !== id));
            this.setTasks(tasks);
            const response = await this.query.delete(id);
            if (!response) throw new Error();
            this.setState({ connectionError: false });
        }
        catch (error) {
            this.setState({ connectionError: true });
        }
    }

    // ------------------------

    createTask() {
        const timer = new Time();
        const creationDate = timer.getFullTimeRaw();
        const modificationDate = creationDate;

        return {
            content: "",
            done: false,
            creationDate: creationDate,
            modificationDate: modificationDate
        };
    }
}

export { ToDoList };