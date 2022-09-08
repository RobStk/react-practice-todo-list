import React from "react";
import ButtonStyle from "./styles/ButtonStyle";

class Button extends React.Component {
    render() {
        return (
            <ButtonStyle
                backgroundColor={this.props.backgroundColor || ""}
                hoverBackgroundColor={this.props.hoverBackgroundColor}
                display={this.props.display || "flex"}
                opacity={this.props.opacity || "inherit"}
                onClick={this.props.onClick}
                onMouseDown={this.props.onMouseDown}
                color={this.props.color}
                className={this.props.className}
                width={this.props.width}
                fontFamily={this.props.fontFamily || "inherit"}
                fontSize={this.props.fontSize || ""}
                border={this.props.border}
                borderColor={this.props.borderColor}
                lineHeight={this.props.borderColor || 1}
            >
                {this.props.icon}
                {this.props.txt}
            </ButtonStyle>
        )
    }
}

export default Button;