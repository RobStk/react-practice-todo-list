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
import { BsXLg as CancelIcon } from "react-icons/bs";

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            isHoverd: false,
            taskIndicatorHover: false,
            edit: false
        }

        this.hasMouseOver = false;

        this.calendarIcon = <CalendarIcon />;
        this.trashIcon = <TrashIcon />;
        this.editIcon = <EditIcon />;
        this.acceptIcon = <AcceptIcon />;
        this.cancelIcon = <CancelIcon />;

        this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleTaskIndicatorMouseEnter = this.handleTaskIndicatorMouseEnter.bind(this);
        this.handleTaskIndicatorMouseLeave = this.handleTaskIndicatorMouseLeave.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    render() {
        let icon = this.props.done ? "done" : "undone";
        if (this.state.taskIndicatorHover) icon = this.props.done ? "undone" : "done";
        const display = this.state.isActive || this.state.isHoverd ? "block" : "none";
        let content = <div>{this.props.title}</div>
        if (this.state.edit) {
            content =
                <InputStyle
                    autoFocus={true}
                    type="text"
                    defaultValue={this.props.title}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleInputBlur}
            />
        }
        return (
            <TaskRowStyle
                ref={(taskRowDOM) => { this.taskRowDOM = taskRowDOM; }} //TODO Używane?
                done={this.props.done}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                isActive={this.state.isActive}
                tabIndex="0"
            >

                <TaskIndicator
                    iconType={icon}
                    onClick={this.handleIndicatorClick}
                    onMouseEnter={this.handleTaskIndicatorMouseEnter}
                    onMouseLeave={this.handleTaskIndicatorMouseLeave}
                />

                {content}

                <RowSectionStyle>
                    <Button
                        display={this.state.edit ? display : "none"}
                        icon={this.cancelIcon}
                        onMouseDown={this.handleCancel}
                        className="cancel"
                    />
                    <Button
                        display={this.state.edit ? display : "none"}
                        icon={this.acceptIcon}
                        onClick={this.handleAccept}
                        className="accept"
                    />
                    <Button
                        display={this.state.edit ? "none" : display}
                        icon={this.editIcon}
                        onClick={this.editTask}
                        onFocus={this.handleFocus}
                    />
                    <Button
                        display={display}
                        icon={this.calendarIcon}
                        onClick={this.openCalendar}
                        onFocus={this.handleFocus}
                    />
                    <Button
                        display={display}
                        icon={this.trashIcon}
                        onClick={this.handleDelete}
                        className="trash"
                    />
                </RowSectionStyle>

            </TaskRowStyle>
        )
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    handleIndicatorClick() {
        const status = !this.props.done;
        if (status === true) this.taskRowDOM.blur();
        this.updateStatus(status);
        this.setState({
            taskIndicatorHover: false
        })
    }

    // ------------------------

    handleFocus(event) {
        this.setState({
            isActive: true
        })
    }

    // ------------------------

    handleBlur(event) {        
        if (!this.hasMouseOver) {
            this.setState({
                isActive: false
            })
        }
    }

    // ------------------------

    handleMouseEnter() {
        this.hasMouseOver = true;
        this.setState({
            isHoverd: true
        });
    }

    // ------------------------

    handleMouseLeave(event) {
        this.hasMouseOver = false;
        if (!this.state.isActive) {
            this.setState({
                isHoverd: false
            });
        }
    }

    // ------------------------

    handleTaskIndicatorMouseEnter() {
        this.setState({
            taskIndicatorHover: true
        });
    }

    // ------------------------

    handleTaskIndicatorMouseLeave() {
        this.setState({
            taskIndicatorHover: false
        });
    }

    // ------------------------

    handleDelete() {
        this.props.onDelete(this.props.id);
    }

    // ------------------------

    editTask() {
        this.setState({
            edit: true
        })
    }

    // ------------------------

    handleAccept(event) {
        this.setState({
            edit: false
        });
    }

    // ------------------------

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

    // ------------------------

    handleCancel(event) {
        this.setState({
            edit: false
        })
    }

    // ------------------------

    handleInputBlur(event) {
        this.updateTitle(event.target.value);
        this.setState({
            edit: false
        });
    }

    // ------------------------

    openCalendar() {
        console.warn("Not implemented calendar feature.");
    }

    // ------------------------

    updateTitle(title) {
        const task = {
            id: this.props.id,
            title: title,
        }
        this.props.onTaskChange(task);
    }

    // ------------------------

    updateStatus(status) {
        const task = {
            id: this.props.id,
            done: status,
        }
        this.props.onTaskChange(task);
    }

    handleKeyDown(event) {
        if (event.code === "Tab" && !event.target.classList.contains("trash")) {
            event.target.blur();
            this.setState({
                isActive: true
            })
        }
    }
}

export default Task;