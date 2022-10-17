import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../../Styles/GlobalStyles";
import darkTheme from "../../Styles/dark-theme";
import HeaderStyle from "../../Styles/HeaderStyle";
import ToDoListStyle from "./styles/ToDoListStyle";
import TasksListContainer from "../TasksListContainer/TasksListContainer";
import TasksAdder from "../TasksAdder/TasksAdder";
import Timer from "../Timer/Timer";
import OfflineBar from "../OfflineBar/OfflineBar";
import { eventsManager, events } from "../../utilities/events-manager";

/**
 * @typedef {import('../../Modules/tasks-manager').default} TasksManager
 * @typedef {import('../../Modules/events-manager').default} EventsManager
 */

class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.theme = darkTheme;

        /** @type {TasksManager} */
        this.tasksManager = props.tasksManager;

        /** @type {EventsManager} */
        this.dataEvents = props.dataEventsManager;

        this.getTasks = this.getTasks.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.setToOnline = this.setToOnline.bind(this);
        this.setToOffline = this.setToOffline.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);

        this.eventsManager = eventsManager;
        this.events = events;
        this.online = true;

        this.state = {
            tasks: [],
        }
    }

    componentDidMount() {
        this.dataEvents.subscribe("new data set", this.getTasks);
        this.dataEvents.subscribe("remote connection success", this.setToOnline);
        this.dataEvents.subscribe("remote connection fail", this.setToOffline);
        this.getTasks();
    }

    render() {
        const tasks = this.state.tasks;
        const offlineDisplay = this.online ? 'none' : "";
        return (
            <>
                <ThemeProvider theme={this.theme}>
                    <GlobalStyle backgroundColor={this.theme.colors.background.primary} />
                    <OfflineBar display={offlineDisplay} onTryAgain={this.forceUpdate} />
                    <ToDoListStyle>
                        <HeaderStyle data-style="HeaderStyle">
                            <TasksAdder onTaskAdd={this.addTask} />
                            <Timer timeProvider={this.props.timeProvider} />
                        </HeaderStyle>
                        <TasksListContainer
                            tasksArr={tasks}
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
        const tasks = this.tasksManager.getTasks();
        this.setState({ tasks: tasks });
    }

    // ------------------------

    async addTask(taskData) {
        const newTask = {};
        newTask.content = taskData.content;
        this.tasksManager.addTask(newTask);
        this.getTasks();
    }

    // ------------------------

    async updateTask(updatedTask) {
        this.tasksManager.updateTask(updatedTask);
        this.getTasks();
    }

    // ------------------------

    async deleteTask(task) {
        this.tasksManager.deleteTask(task);
        this.getTasks();
    }

    // ------------------------

    setToOffline() {
        this.online = false;
    }

    // ------------------------

    setToOnline() {
        this.online = true;
    }

    // ------------------------

    forceUpdate() {
        this.tasksManager.synchronize();
    }

    // ------------------------
}

export default ToDoList;