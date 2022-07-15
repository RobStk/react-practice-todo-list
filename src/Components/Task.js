import React from "react";
import TaskRowStyle from "./Styles/TaskRowStyle";
import TaskIndicator from "./TaskIndicator";
import { Button } from "./Button";
import RowSectionStyle from "./Styles/RowSectionStyle";
import { BsCalendar3 as CalendarIcon } from "react-icons/bs";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: this.props.done,
            hover: false,
            taskIndicatorHover: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleTaskIndicatorMouseEnter = this.handleTaskIndicatorMouseEnter.bind(this);
        this.handleTaskIndicatorMouseLeave = this.handleTaskIndicatorMouseLeave.bind(this);
    }
    render() {
        let icon = this.state.done ? "done" : "undone";
        if (this.state.taskIndicatorHover) icon = this.state.done ? "undone" : "done";
        const display = this.state.hover ? "block" : "none";
        const calendarIcon = <CalendarIcon />;
        return (
            <TaskRowStyle
                done={this.state.done}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>

                <TaskIndicator
                    iconType={icon}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleTaskIndicatorMouseEnter}
                    onMouseLeave={this.handleTaskIndicatorMouseLeave}
                />

                <div>{this.props.title}</div>

                <RowSectionStyle>
                    <Button
                        value="v"
                        display={display}
                        icon={calendarIcon} />
                </RowSectionStyle>

            </TaskRowStyle>
        )
    }

    handleClick() {
        this.setState((state) => ({ done: !state.done }))
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
}

export default Task;