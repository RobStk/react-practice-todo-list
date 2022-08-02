import React from "react";
import DropDownOptionsStyle from "./Styles/DropDownOptionsStyle";
import Button from "./Button";

class DropDownOptions extends React.Component {
    constructor(props) {
        super(props);
        this.selectOption = this.selectOption.bind(this);
    }
    render() {
        const options = this.props.options.map((option, index) =>
            option = <Button txt={option} key={index} onClick={this.selectOption} />
        )
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

    selectOption(event) {
        this.props.onClick && this.props.onClick(event.target.textContent);
    }
}

export default DropDownOptions;