import React from "react";
import { BsPlusCircle as AddIcon } from "react-icons/bs";
import { BsCircle as UndoneIcon } from "react-icons/bs";
import { BsCheckCircle as DoneIcon } from "react-icons/bs";
import TaskIndicatorStyle from "./Styles/TaskIndicatorStyle";

class TaskIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    render() {
        const icon = this.setIcon(this.props.iconType);
        return (
            <TaskIndicatorStyle
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {icon}
            </TaskIndicatorStyle>
        )
    }

    setIcon(iconType) {
        switch (iconType) {
            case "add":
                return <AddIcon />;
            case "undone":
                return <UndoneIcon />
            case "done":
                return <DoneIcon />
            default:
                return <UndoneIcon />;
        }
    }

    handleClick() {
        this.props.onClick && this.props.onClick();
    }

    handleMouseEnter() {
        this.props.onMouseEnter && this.props.onMouseEnter();
    }

    handleMouseLeave() {
        this.props.onMouseLeave && this.props.onMouseLeave();
    }
}

export default TaskIndicator;