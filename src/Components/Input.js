import React from "react";
import InputStyle from "./Styles/InputStyle";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: props.placeholder,
        }
    }
    render() {
        return (
            <InputStyle
                id={this.props.id}
                type={this.props.type}
                value={this.props.value}
                autoComplete={this.props.autocomplete || "on"}
                placeholder={this.state.placeholder}
                onChange={(event) => { this.handleChange(event) }}
                onFocus={() => { this.handleFocus() }}
                onBlur={() => { this.handleBlur() }}
                onKeyDown={this.props.onKeyDown}
            />
        );
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    handleFocus() {
        this.setState({
            placeholder: ""
        });
        this.props.onFocus();
    }

    // ------------------------

    handleBlur() {
        this.setState({
            placeholder: this.props.placeholder
        });
        this.props.onBlur();
    }

    // ------------------------

    handleChange(event) {
        this.props.onChange(event);
    }
}

export { Input };