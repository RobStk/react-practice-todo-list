import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../../Styles/GlobalStyles";
import darkTheme from "../../Styles/dark-theme";
import Button from "../Button/Button";
import Badge from "../Badge/Badge";
import ToDoListStyle from "./styles/ToDoListStyle";
import TasksListContainer from "../TasksListContainer/TasksListContainer";
import TasksAdder from "../TasksAdder/TasksAdder";
import RowSectionStyle from "../../Styles/RowSectionStyle";
import { BsCalendar3 as CalendarIcon } from "react-icons/bs";
import { BsClock as ClockIcon } from "react-icons/bs";
import { BsCloud as OnlineIcon } from "react-icons/bs";
import { BsCloudSlash as OfflineIcon } from "react-icons/bs";
import { BsArrowRepeat as LoadingIcon } from "react-icons/bs";

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
        this.onlineIcon = <OnlineIcon color={this.theme.colors.foreground.secondary} />;
        this.offlineIcon = <OfflineIcon color={this.theme.colors.foreground.red} />;
        this.loadingIcon = <LoadingIcon className="rotating" color={this.theme.colors.foreground.primary} />;

        this.getTasks = this.getTasks.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.setToOnline = this.setToOnline.bind(this);
        this.setToOffline = this.setToOffline.bind(this);
        this.setToLoading = this.setToLoading.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);

        this.online = true;

        const currentDate = this.time.getDateDashed();
        const currentTime = this.time.getTimeWithColons();
        this.state = {
            tasks: [],
            date: currentDate,
            time: currentTime,
            dataLoading: false
        }

        this.dataEvents.subscribe("new data set", this.getTasks);
        this.dataEvents.subscribe("start remote connection", this.setToLoading);
        this.dataEvents.subscribe("remote connection success", this.setToOnline);
        this.dataEvents.subscribe("remote connection fail", this.setToOffline);
    }

    componentDidMount() {
        setInterval(() => { this.updateTime() }, 1000);
        this.getTasks();
        this.forceUpdate();
    }

    render() {
        const tasks = this.state.tasks;
        const statusIcon = this.getStatusIcon();
        return (
            <>
                <ThemeProvider theme={this.theme}>
                    <GlobalStyle backgroundColor={this.theme.colors.background.primary} />
                    <ToDoListStyle>
                        <RowSectionStyle gap="20px">
                            <Badge icon={this.clockIcon} value={this.state.time} />
                            <Badge icon={this.calendarIcon} value={this.state.date} />
                            <Button
                                icon={statusIcon}
                                onClick={this.forceUpdate}
                            />
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
        this.setState({ tasks: tasks, dataLoading: false });
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

    setToLoading() {
        this.setState({ dataLoading: true });
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

    getStatusIcon() {
        if (this.state.dataLoading) return this.loadingIcon;
        if (this.online) return this.onlineIcon;
        else return this.offlineIcon;
    }

    // ------------------------
}

export default ToDoList;