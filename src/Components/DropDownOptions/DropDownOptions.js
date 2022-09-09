import React from "react";
import DropDownOptionsStyle from "./styles/DropDownOptionsStyle";
import Button from "../Button/Button";

class DropDownOptions extends React.Component {
    constructor(props) {
        super(props);
        this.selectOption = this.selectOption.bind(this);
    }
    render() {
        const options = this.changeOptionsToButtons(this.props.options);
        return (
            <DropDownOptionsStyle
                display={this.props.display}
                fontSize="small"
            >
                <div>
                    {options}
                </div>
            </DropDownOptionsStyle>
        )
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    changeOptionsToButtons(options) {
        const buttons = options.map((option, index) => option = <Button txt={option} key={index} onClick={this.selectOption} />)
        return buttons;
    }

    // ------------------------

    selectOption(event) {
        this.props.onClick && this.props.onClick(event.target.textContent);
    }

    // ------------------------
}

export default DropDownOptions;