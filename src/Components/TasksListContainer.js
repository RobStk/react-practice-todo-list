import React from "react";
import TasksRowsContainerStyle from "./Styles/TasksRowsContainerStyle";
import Task from "./Task";
import Button from "./Button";
import { BsChevronDown as ExpandIcon } from "react-icons/bs"
import ExpandIconStyle from "./Styles/ExpandIconStyle";
import RowSectionStyle from "./Styles/RowSectionStyle";
import SortDirectionButton from "./SortDirectionButton";

class TasksListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpansion = this.handleExpansion.bind(this);
        this.changeSorting = this.changeSorting.bind(this);

        this.state = {
            doneVisibility: "collapsed",
            isAscending: true
        }
    }

    render() {
        let sortedTasks = this.sortTasks(this.props.tasksArr, "creationDate", this.state.isAscending);
        const todoTasks = sortedTasks.filter((task) => !task.done);
        const doneTasks = sortedTasks.filter((task) => task.done);
        const todoTasksComponents = this.prepareTasks(todoTasks);
        const doneTasksComponents = this.prepareTasks(doneTasks);
        const doneSectionBtnVisibility = doneTasksComponents.length > 0 ? "" : "none";
        const doneSectionVisibility = this.state.doneVisibility === "expanded" ? "" : "none";
        const expandIcon = <ExpandIconStyle className={this.state.doneVisibility}><ExpandIcon /></ExpandIconStyle>;

        return (
            <>
                <RowSectionStyle>
                    <SortDirectionButton onClick={this.changeSorting} isAscending={this.state.isAscending} />
                    {/* {sortTypeButton} */}
                </RowSectionStyle>
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

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

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

    // ------------------------

    handleExpansion() {
        const doneVisibility = this.state.doneVisibility === "collapsed" ? "expanded" : "collapsed";
        this.setState({ doneVisibility: doneVisibility });
    }

    // ------------------------

    changeSorting() {
        const isAscending = !this.state.isAscending;
        this.setState({ isAscending: isAscending });
    }

    // ------------------------

    sortTasks(tasksArr, sortBy, isAscending) {
        switch (sortBy) {
            case "creationDate":
                let sortedTasks = [];
                if (isAscending) sortedTasks = [...tasksArr].sort((a, b) => a.creationDate - b.creationDate);
                if (!isAscending) sortedTasks = [...tasksArr].sort((a, b) => b.creationDate - a.creationDate);
                return sortedTasks;
            default:
                return tasksArr;
        }
    }
}

export default TasksListContainer;