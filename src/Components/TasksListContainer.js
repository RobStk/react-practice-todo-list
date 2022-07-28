import React from "react";
import TasksRowsContainerStyle from "./Styles/TasksRowsContainerStyle";
import Task from "./Task";
import Button from "./Button";
import { BsChevronDown as ExpandIcon } from "react-icons/bs"
import ExpandIconStyle from "./Styles/ExpandIconStyle";

class TasksListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpansion = this.handleExpansion.bind(this);

        this.state = {
            doneVisibility: "collapsed"
        }
    }

    render() {
        let sortedTasks = [...this.props.tasksArr].sort((a, b) => a.creationDate - b.creationDate);
        const todoTasks = sortedTasks.filter((task) => !task.done);
        const doneTasks = sortedTasks.filter((task) => task.done);
        const todoTasksComponents = this.prepareTasks(todoTasks);
        const doneTasksComponents = this.prepareTasks(doneTasks);
        const doneSectionBtnVisibility = doneTasksComponents.length > 0 ? "" : "none";
        const doneSectionVisibility = this.state.doneVisibility === "expanded" ? "" : "none";
        const expandIcon = <ExpandIconStyle className={this.state.doneVisibility}><ExpandIcon /></ExpandIconStyle>;

        return (
            <>
                <TasksRowsContainerStyle>
                    {todoTasksComponents.length > 0 ? todoTasksComponents : <div>Brak zadań do wykonania.</div>}
                </TasksRowsContainerStyle>
                <Button
                    display={doneSectionBtnVisibility}
                    icon={expandIcon}
                    txt={"Wykonane " + doneTasksComponents.length}
                    width="max-content"
                    onClick={this.handleExpansion}
                    fontSize={"medium"}
                />
                <TasksRowsContainerStyle display={doneSectionVisibility}>
                    {doneTasksComponents}
                </TasksRowsContainerStyle>
            </>
        );
    }

    prepareTasks(tasksArr) {
        const tasksComponentsList = tasksArr.map((task) =>
            task = (
                <Task
                    title={task.title}
                    done={task.done}
                    key={task.id || task.tempId}
                    id={task.id}
                    onDelete={this.props.onDelete}
                    onTaskChange={this.props.onTaskChange}
                />
            )
        );
        return tasksComponentsList;
    }

    handleExpansion() {
        const doneVisibility = this.state.doneVisibility === "collapsed" ? "expanded" : "collapsed";
        this.setState({
            doneVisibility: doneVisibility
        })
    }
}

export default TasksListContainer;