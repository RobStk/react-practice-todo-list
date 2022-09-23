import React from "react";
import { BsPlusCircle as AddIcon } from "react-icons/bs";
import { BsCircle as UndoneIcon } from "react-icons/bs";
import { BsCheckCircle as DoneIcon } from "react-icons/bs";
import TaskIndicatorStyle from "./styles/TaskIndicatorStyle";

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
                onKeyDown={this.props.onKeyDown}
                tabIndex="0"
                className={this.props.className}
                data-testid="TaskIndicator"
            >
                {icon}
            </TaskIndicatorStyle>
        )
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    setIcon(iconType) {
        switch (iconType) {
            case "add":
                return <AddIcon />;
            case "undone":
                return <UndoneIcon data-testid="undoneIcon" />
            case "done":
                return <DoneIcon data-testid="doneIcon" />
            default:
                return <UndoneIcon data-testid="undoneIcon" />;
        }
    }

    // ------------------------

    handleClick() {
        this.props.onClick && this.props.onClick();
    }

    // ------------------------

    handleMouseEnter() {
        this.props.onMouseEnter && this.props.onMouseEnter();
    }

    // ------------------------

    handleMouseLeave() {
        this.props.onMouseLeave && this.props.onMouseLeave();
    }
}

export default TaskIndicator;