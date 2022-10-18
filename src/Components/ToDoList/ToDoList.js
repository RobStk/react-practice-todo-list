import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../../Styles/GlobalStyles";
import darkTheme from "../../Styles/dark-theme";
import Badge from "../Badge/Badge";
import ToDoListStyle from "./styles/ToDoListStyle";
import TasksListContainer from "../TasksListContainer/TasksListContainer";
import TasksAdder from "../TasksAdder/TasksAdder";
import RowSectionStyle from "../../Styles/RowSectionStyle";
import Button from "../Button/Button";
import { BsCalendar3 as CalendarIcon } from "react-icons/bs";
import { BsClock as ClockIcon } from "react-icons/bs";
import { BsCloud as OnlineIcon } from "react-icons/bs";
import { BsCloudSlash as OfflineIcon } from "react-icons/bs";

/**
 * @typedef {import('../../Modules/tasks-manager').default} TasksManager
 * @typedef {import('../../Modules/events-manager').default} EventsManager
 * @typedef {import('../../Modules/client-time-service').default} TimeService
 */

class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.theme = darkTheme;

        /** @type {TasksManager} */
        this.tasksManager = props.tasksManager;

        /** @type {EventsManager} */
        this.dataEvents = props.dataEventsManager;

        /** @type {TimeService} */
        this.time = props.timeProvider;

        this.calendarIcon = <CalendarIcon />;
        this.clockIcon = <ClockIcon />;
        this.onlineIcon = <OnlineIcon />;
        this.offlineIcon = <OfflineIcon />;

        this.getTasks = this.getTasks.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.setToOnline = this.setToOnline.bind(this);
        this.setToOffline = this.setToOffline.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);

        this.online = true;

        const currentDate = this.time.getDateDashed();
        const currentTime = this.time.getTimeWithColons();
        this.state = {
            tasks: [],
            date: currentDate,
            time: currentTime
        }
    }

    componentDidMount() {
        this.dataEvents.subscribe("new data set", this.getTasks);
        this.dataEvents.subscribe("remote connection success", this.setToOnline);
        this.dataEvents.subscribe("remote connection fail", this.setToOffline);
        setInterval(() => { this.updateTime() }, 1000);
        this.getTasks();
    }

    render() {
        const tasks = this.state.tasks;
        return (
            <>
                <ThemeProvider theme={this.theme}>
                    <GlobalStyle backgroundColor={this.theme.colors.background.primary} />
                    <ToDoListStyle>
                        <RowSectionStyle gap="20px">
                            <Badge icon={this.clockIcon} value={this.state.time} />
                            <Badge icon={this.calendarIcon} value={this.state.date} />
                            <Button icon={this.online ? this.onlineIcon : this.offlineIcon} onClick={this.forceUpdate} color={this.online ? "cyan" : "red"} />
                        </RowSectionStyle>
                        <TasksAdder onTaskAdd={this.addTask} />
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

    addTask(taskData) {
        const newTask = {};
        newTask.content = taskData.content;
        this.tasksManager.addTask(newTask);
    }

    // ------------------------

    updateTask(updatedTask) {
        this.tasksManager.updateTask(updatedTask);
    }

    // ------------------------

    deleteTask(task) {
        this.tasksManager.deleteTask(task);
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

    updateTime() {
        const date = this.time.getDateDashed();
        const time = this.time.getTimeWithColons();
        this.setState({
            date: date,
            time: time
        });
    }

    // ------------------------
}

export default ToDoList;