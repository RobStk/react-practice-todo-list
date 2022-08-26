import React from "react";
import Button from "./Button";
import OfflineBarStyle from "./Styles/OfflineBarStyle";
import { BsExclamationCircle as WarrningIcon } from "react-icons/bs"

class OfflineBar extends React.Component {
    render() {
        return (
            <OfflineBarStyle display={this.props.display}>
                <WarrningIcon />
                <span>Jesteś w trybie offline.</span>
                <Button txt='Spróbuj ponownie' onClick={this.props.onReconnect} />
            </OfflineBarStyle>
        )
    }
}

export default OfflineBar;