import React from "react";
import ConnectionErrorStyle from "./styles/ConnectionErrorStyle";
import { BsFillEmojiFrownFill as SadIcon } from "react-icons/bs";

class ConnectionError extends React.Component {
    constructor(props) {
        super(props);
        this.defaultErrorDescription = 'Wystąpił problem.';
        this.defaultErrorAdvice = 'Sprawdź połączenie z serwerem lub spróbuj ponownie później.';
    }
    render() {
        const errorDescription = this.props.description || this.defaultErrorDescription;
        const errorAdvice = this.props.errorAdvice || this.defaultErrorAdvice;
        return (
            <ConnectionErrorStyle>
                <div className="errorIcon"><SadIcon /></div>
                <div className="errorDescription">{errorDescription}</div>
                <div className="errorAdvice">{errorAdvice}</div>
            </ConnectionErrorStyle>
        )
    }
}

export default ConnectionError;