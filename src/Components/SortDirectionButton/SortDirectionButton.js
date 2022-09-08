import React from "react";
import Button from "../Button/Button";
import { BsArrowDown as ArrowDownIcon } from "react-icons/bs";
import { BsArrowUp as ArrowUpIcon } from "react-icons/bs";

class SortDirectionButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const icon = this.props.isAscending ? <ArrowDownIcon /> : <ArrowUpIcon />;
        return <Button
            icon={icon}
            onClick={this.handleClick}
            display={this.props.display}
            fontSize={"small"}
            backgroundColor="background-stage1"
        />
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    handleClick() {
        this.props.onClick && this.props.onClick();
    }
}

export default SortDirectionButton;