import React from "react";
import TasksRowsContainerStyle from "./Styles/TasksRowsContainerStyle";
import Task from "./Task";
import Button from "./Button";
import { BsChevronDown as ExpandIcon } from "react-icons/bs"
import ExpandIconStyle from "./Styles/ExpandIconStyle";
import RowSectionStyle from "./Styles/RowSectionStyle";
import SortDirectionButton from "./SortDirectionButton";
import SortByPanel from "./SortByPanel";

class TasksListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpansion = this.handleExpansion.bind(this);
        this.changeSorting = this.changeSorting.bind(this);
        this.changeSortProp = this.changeSortProp.bind(this);

        this.sortOptions = ["Nazwa", "Data utworzenia", "Ostatnia modyfikacja"];

        this.state = {
            doneVisibility: "collapsed",
            isAscending: true,
            sortBy: this.sortOptions[1]
        }
    }

    render() {
        let sortedTasks = this.sortTasks(this.props.tasksArr, this.state.sortBy, this.state.isAscending);
        const todoTasks = sortedTasks.filter((task) => !task.done);
        const doneTasks = sortedTasks.filter((task) => task.done);
        const todoTasksComponents = this.prepareTasks(todoTasks);
        const doneTasksComponents = this.prepareTasks(doneTasks);
        const sortingDisplay = this.props.tasksArr.length > 1 ? "" : "none";
        const doneSectionBtnDisplay = doneTasksComponents.length > 0 ? "" : "none";
        const doneSectionDisplay = this.state.doneVisibility === "expanded" ? "" : "none";
        const expandIcon = <ExpandIconStyle className={this.state.doneVisibility}><ExpandIcon /></ExpandIconStyle>;

        return (
            <>
                <RowSectionStyle gap="0" display={sortingDisplay}>
                    <SortDirectionButton
                        onClick={this.changeSorting}
                        isAscending={this.state.isAscending}
                    />
                    <SortByPanel
                        sortOptions={this.sortOptions}
                        sortingProp={this.state.sortBy}
                        onOptionSelect={this.changeSortProp}
                    />
                </RowSectionStyle>
                <TasksRowsContainerStyle>
                    {todoTasksComponents.length > 0 ? todoTasksComponents : <div>Brak zadań do wykonania.</div>}
                </TasksRowsContainerStyle>
                <Button
                    display={doneSectionBtnDisplay}
                    icon={expandIcon}
                    txt={"Wykonane " + doneTasksComponents.length}
                    width="max-content"
                    onClick={this.handleExpansion}
                    fontSize={"medium"}
                />
                <TasksRowsContainerStyle display={doneSectionDisplay}>
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

    changeSortProp(prop) {
        this.setState({
            sortBy: prop
        })
    }

    // ------------------------

    sortTasks(tasksArr, sortBy, isAscending) {
        let sortedTasks = [];
        switch (sortBy) {
            case "Nazwa":
                if (isAscending) sortedTasks = [...tasksArr].sort((a, b) => a.title.localeCompare(b.title));
                if (!isAscending) sortedTasks = [...tasksArr].sort((a, b) => b.title.localeCompare(a.title));
                return sortedTasks;
            case "Data utworzenia":
                if (isAscending) sortedTasks = [...tasksArr].sort((a, b) => a.creationDate - b.creationDate);
                if (!isAscending) sortedTasks = [...tasksArr].sort((a, b) => b.creationDate - a.creationDate);
                return sortedTasks;
            case "Ostatnia modyfikacja":
                if (isAscending) sortedTasks = [...tasksArr].sort((a, b) => a.modificationDate - b.modificationDate);
                if (!isAscending) sortedTasks = [...tasksArr].sort((a, b) => b.modificationDate - a.modificationDate);
                return sortedTasks;
            default:
                return tasksArr;
        }
    }
}

export default TasksListContainer;