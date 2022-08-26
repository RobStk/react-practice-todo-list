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
import TimeManager from "../utilities/time-manager";
import OfflineBar from "./OfflineBar";
import QueryQueue from "../utilities/query-queue";
import QueryManager from "../utilities/query-manager";
import { eventsManager, events } from "../utilities/events-manager";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.tasks = [];
        this.newTasks = [];
        this.query = new Connection(props.dbPath);
        this.db = new QueryManager(this.props.dbPath);
        this.queryQueue = new QueryQueue();
        this.theme = darkTheme;

        this.tempIdCnt = 0;

        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.updateConnectionStateToCorrect = this.updateConnectionStateToCorrect.bind(this);
        this.reconnect = this.reconnect.bind(this);
        this.setToOffline = this.setToOffline.bind(this);

        this.eventsManager = eventsManager;
        this.events = events;

        this.state = {
            tasks: [],
            connectionError: false
        }
    }

    componentDidMount() {
        eventsManager.on(events.connectionCorrect, this.updateConnectionStateToCorrect);
        eventsManager.on(events.connectionError, this.setToOffline);
        this.getTasks();
    }

    render() {
        const tasks = this.state.tasks.length ? [...this.state.tasks] : [...this.tasks];
        const offlineDisplay = this.state.connectionError ? "" : 'none';
        return (
            <>
                <ThemeProvider theme={this.theme}>
                    <GlobalStyle backgroundColor={this.theme.colors.background.primary} />
                    <OfflineBar display={offlineDisplay} onReconnect={this.reconnect} />
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
        const connection = await this.db.connect();
        if (connection.error && connection.error !== 404) {
            return;
        }

        const query = await this.db.getTasks();
        const tasks = query.data;
        const error = query.error;
        if (!error) {
            tasks.forEach(task => {
                if (task.tempId) {
                    delete task.tempId;
                    this.db.updateTask(task);
                }
            });
            this.setTasks(tasks);
        }
        if (error) {
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
        const newTask = this.createTask();
        newTask.content = taskData.content;
        newTask.tempId = "tempId" + this.tempIdCnt;
        this.tempIdCnt++;
        const tasks = [...this.state.tasks, newTask];
        this.setTasks(tasks);
        await this.db.addTask(newTask);
        this.eventsManager.emit(events.dataUpdated);
    }

    // ------------------------

    async updateTask(updatedTask) {
        const id = updatedTask.id;
        const tempId = updatedTask.tempId;
        let tasks = [...this.state.tasks];
        let task = null;
        if (id) {
            task = tasks.find((t) => t.id === id);
            tasks = tasks.filter((t) => t.id !== id);
        }
        if (!id) {
            task = tasks.find((t) => t.tempId === tempId);
            tasks = tasks.filter((t) => t.tempId !== tempId);
        }
        task = { ...task, ...updatedTask };
        const timer = new TimeManager();
        task.modificationDate = timer.getFullTimeRaw();
        tasks.push(task);
        this.setTasks(tasks);

        await this.db.updateTask(task);
        this.eventsManager.emit(events.dataUpdated);
    }

    // ------------------------

    async deleteTask(task) {
        const id = task.props.id;
        const tempId = task.props.tempId;
        let tasks = [];

        if (id) {
            tasks = this.state.tasks.filter((task) => (task.id !== id));
        }

        if (!id) {
            tasks = this.state.tasks.filter((t) => (t.tempId !== tempId));
        }

        this.setState({
            tasks: tasks
        });

        await this.db.deleteTask(task);
        this.eventsManager.emit(events.dataUpdated);
    }

    // ------------------------

    createTask() {
        const timer = new TimeManager();
        const creationDate = timer.getFullTimeRaw();
        const modificationDate = creationDate;

        return {
            content: "",
            done: false,
            creationDate: creationDate,
            modificationDate: modificationDate
        };
    }

    // ------------------------

    setToOffline() {
        this.setState({ connectionError: true });
    }

    // ------------------------

    async reconnect() {
        console.log("Reconnect...");
        this.getTasks();
    }

    // ------------------------

    async updateConnectionStateToCorrect() {
        if (this.state.connectionError) {
            this.setState({ connectionError: false });
        }
    }
}

export { ToDoList };