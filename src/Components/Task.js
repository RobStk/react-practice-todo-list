import React from "react";
import TaskRowStyle from "./Styles/TaskRowStyle";
import TaskIndicator from "./TaskIndicator";
import Button from "./Button";
import RowSectionStyle from "./Styles/RowSectionStyle";
import InputStyle from "./Styles/InputStyle";
import { BsCalendar3 as CalendarIcon } from "react-icons/bs";
import { BsTrash as TrashIcon } from "react-icons/bs";
import { BsPencil as EditIcon } from "react-icons/bs";
import { BsCheckLg as AcceptIcon } from "react-icons/bs";

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false,
            taskIndicatorHover: false,
            edit: false
        }

        this.calendarIcon = <CalendarIcon />;
        this.trashIcon = <TrashIcon />;
        this.editIcon = <EditIcon />;
        this.acceptIcon = <AcceptIcon />;

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleTaskIndicatorMouseEnter = this.handleTaskIndicatorMouseEnter.bind(this);
        this.handleTaskIndicatorMouseLeave = this.handleTaskIndicatorMouseLeave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
    }
    render() {
        let icon = this.props.done ? "done" : "undone";
        if (this.state.taskIndicatorHover) icon = this.props.done ? "undone" : "done";
        const display = this.state.hover ? "block" : "none";
        let content = <div>{this.props.title}</div>
        let editButton =
            <Button
                display={display}
                icon={this.editIcon}
                onClick={this.handleEdit}
            />;
        if (this.state.edit) {
            content =
                <InputStyle
                    autoFocus={true}
                    type="text"
                    defaultValue={this.props.title}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleInputBlur}
                />
            editButton =
                <Button
                    display={display}
                    icon={this.acceptIcon}
                    onClick={this.handleAccept}
                    color="lightGreen"
                />;
        }
        return (
            <TaskRowStyle
                done={this.props.done}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>

                <TaskIndicator
                    iconType={icon}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleTaskIndicatorMouseEnter}
                    onMouseLeave={this.handleTaskIndicatorMouseLeave}
                />

                {content}

                <RowSectionStyle>
                    {editButton}
                    <Button
                        display={display}
                        icon={this.calendarIcon}
                        onClick={this.openCalendar}
                    />
                    <Button
                        display={display}
                        icon={this.trashIcon}
                        onClick={this.handleDelete}
                    />
                </RowSectionStyle>

            </TaskRowStyle>
        )
    }

    handleClick() {
        const status = !this.props.done
        this.updateStatus(status);
    }

    handleMouseEnter() {
        this.setState({
            hover: true
        });
    }

    handleMouseLeave() {
        this.setState({
            hover: false
        });
    }

    handleTaskIndicatorMouseEnter() {
        this.setState({
            taskIndicatorHover: true
        });
    }

    handleTaskIndicatorMouseLeave() {
        this.setState({
            taskIndicatorHover: false
        });
    }

    handleDelete() {
        this.props.onDelete(this.props.id);
    }

    handleEdit() {
        this.setState({
            edit: true
        })
    }

    handleAccept() {
        this.setState({
            edit: false
        })
    }

    handleInputKeyDown(event) {
        if (event.key === "Enter") {
            this.updateTitle(event.target.value);
            this.setState({
                edit: false
            });
        }
        if (event.key === "Escape") {
            this.setState({
                edit: false
            });
        }
    }

    handleInputBlur(event) {
        console.log(event.target.value);
        this.updateTitle(event.target.value);
        this.setState({
            edit: false
        });
    }

    openCalendar() {
        console.warn("Not implemented calendar feature.");
    }

    updateTitle(title) {
        const task = {
            id: this.props.id,
            title: title,
        }
        this.props.onTaskChange(task);
    }

    updateStatus(status) {
        const task = {
            id: this.props.id,
            done: status,
        }
        this.props.onTaskChange(task);
    }
}

export default Task;