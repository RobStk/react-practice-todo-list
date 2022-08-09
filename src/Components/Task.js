import React from "react";
import TaskRowStyle from "./Styles/TaskRowStyle";
import TaskIndicator from "./TaskIndicator";
import Button from "./Button";
import RowSectionStyle from "./Styles/RowSectionStyle";
import TaskContent from "./TaskContent";
import TextArea from "./TextArea";
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
        this.contentHeight = '';

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
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTaskIndicatorMouseEnter = this.handleTaskIndicatorMouseEnter.bind(this);
        this.handleTaskIndicatorMouseLeave = this.handleTaskIndicatorMouseLeave.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleIndicatorKeyDown = this.handleIndicatorKeyDown.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.getContentHeight = this.getContentHeight.bind(this);

        this.DOM = React.createRef();
    }

    render() {
        let icon = this.props.done ? "done" : "undone";
        if (this.state.taskIndicatorHover) icon = this.props.done ? "undone" : "done";
        const display = this.state.isActive || this.state.isHoverd ? "flex" : "none";
        let content = (
            <TaskContent
                content={this.props.title}
                isExpanded={this.state.isActive}
                onUpdate={this.getContentHeight}
            />
        )
        if (this.state.edit) {
            content = (
                <TextArea
                    defaultValue={this.props.title}
                    autoFocus={true}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleInputBlur}
                    height={this.contentHeight}
                    className="taskEditTextArea"
                />
            )
        }
        return (
            <TaskRowStyle
                ref={this.DOM}
                done={this.props.done}
                isActive={this.state.isActive}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseDown={this.handleMouseDown}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                tabIndex="0"
            >

                <TaskIndicator
                    iconType={icon}
                    onClick={this.handleIndicatorClick}
                    onMouseEnter={this.handleTaskIndicatorMouseEnter}
                    onMouseLeave={this.handleTaskIndicatorMouseLeave}
                    onKeyDown={this.handleIndicatorKeyDown}
                />

                {content}

                <RowSectionStyle>
                    <Button
                        display={this.state.edit ? display : "none"}
                        icon={this.cancelIcon}
                        onMouseDown={this.handleCancel}
                        className="cancelButton"
                    />
                    <Button
                        display={this.state.edit ? display : "none"}
                        icon={this.acceptIcon}
                        onMouseDown={this.handleAccept}
                        className="acceptButton"
                    />
                    <Button
                        display={this.state.edit ? "none" : display}
                        icon={this.editIcon}
                        onClick={this.editTask}
                        onFocus={this.handleFocus}
                        className="editButton"
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
        this.changeStatus();
        this.setState({
            taskIndicatorHover: false,
            isActive: false
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
                isActive: false,
                isHoverd: false
            })
        }
        if (this.hasMouseOver) {
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

    handleMouseDown(event) {
        if (event.target.classList.contains("editButton")) return;
        if (event.target.classList.contains("taskEditTextArea")) return;
        event.preventDefault();
    }

    // ------------------------

    handleClick(event) {
        if (!event.target.classList.contains("taskEditTextArea")) this.DOM.current.focus();
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

    handleInputKeyDown(event) {
        if (event.key === "Enter") {
            const value = this.DOM.current.querySelector(".taskEditTextArea").value;
            this.updateTitle(value);
            this.setState({
                edit: false
            });
            this.DOM.current.focus();
        }
        if (event.key === "Escape") {
            this.setState({
                edit: false
            });
            this.DOM.current.focus();
        }
    }

    // ------------------------

    handleIndicatorKeyDown(event) {
        if (event.key === "Enter") {
            this.changeStatus();
            this.DOM.current.focus();
        }
    }

    // ------------------------

    handleAccept(event) {
        const value = this.DOM.current.querySelector(".taskEditTextArea").value;
        this.updateTitle(value);
    }

    // ------------------------

    handleCancel() {
        this.setState({
            edit: false
        })
    }

    // ------------------------

    handleInputBlur(event) {
        // this.updateTitle(event.target.value);
        if (this.hasMouseOver) {
            this.setState({
                edit: false
            });
        }
        if (!this.hasMouseOver) {
            this.setState({
                edit: false,
                isHoverd: false
            });
        }
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

    changeStatus() {
        const status = !this.props.done;
        if (status === true) this.DOM.current.blur();
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

    getContentHeight(elementScrollHeight) {
        this.contentHeight = elementScrollHeight;
    }
}

export default Task;