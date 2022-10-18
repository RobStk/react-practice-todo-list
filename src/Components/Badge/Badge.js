import React from "react";
import BadgeStyle from "./styles/BadgeStyle";

class Badge extends React.Component {
    render() {
        return (
            <BadgeStyle>
                <div>{this.props.icon}</div>
                <div>{this.props.value}</div>
            </BadgeStyle>
        )
    }
}
export default Badge;