import React from "react";
import ButtonStyle from "./Styles/ButtonStyle";

class Button extends React.Component {
    render() {
        const display = this.props.display;
        return (
            <ButtonStyle
                hoverBackgroundColor={this.props.hoverBackgroundColor}
                display={display}
                onClick={this.props.onClick}
                onMouseDown={this.props.onMouseDown}
                color={this.props.color}
                className={this.props.className}
            >
                {this.props.icon}
            </ButtonStyle>
        )
    }
}

export default Button;