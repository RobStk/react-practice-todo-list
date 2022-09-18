import React from "react";
import Button from "../Button/Button";
import OfflineBarStyle from "./styles/OfflineBarStyle";
import { BsExclamationCircle as WarningIcon } from "react-icons/bs"

class OfflineBar extends React.Component {
    render() {
        return (
            <OfflineBarStyle display={this.props.display}>
                <WarningIcon className="icon" />
                <span>Jesteś w trybie offline.</span>
                <Button txt='Spróbuj ponownie' onClick={this.props.onReconnect} />
            </OfflineBarStyle>
        )
    }
}

export default OfflineBar;