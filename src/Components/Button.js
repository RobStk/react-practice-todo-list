import React from "react";
import ButtonStyle from "./Styles/ButtonStyle";

class Button extends React.Component {
    render() {
        return (
            <ButtonStyle
                hoverBackgroundColor={this.props.hoverBackgroundColor}
                display={this.props.display || "flex"}
                opacity={this.props.opacity || "inherit"}
                onClick={this.props.onClick}
                onMouseDown={this.props.onMouseDown}
                color={this.props.color}
                className={this.props.className}
                width={this.props.width}
                font-family={this.props.fontFamily || "inherit"}
                fontSize={this.props.fontSize || ""}
            >
                {this.props.icon}
                {this.props.txt}
            </ButtonStyle>
        )
    }
}

export default Button;