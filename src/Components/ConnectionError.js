import React from "react";
import ConnectionErrorStyle from "./Styles/ConnectionErrorStyle";
import { BsFillEmojiFrownFill as SadIcon } from "react-icons/bs";

class ConnectionError extends React.Component {
    render() {
        return (
            <ConnectionErrorStyle>
                <div className="errorIcon"><SadIcon /></div>
                <div className="errorDescription">{this.props.description}</div>
                <div className="errorAdvice">Sprawdź połączenie z serwerem lub spróbuj ponowanie później.</div>
            </ConnectionErrorStyle>
        )
    }
}

export default ConnectionError;