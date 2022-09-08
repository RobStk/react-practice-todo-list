import React from "react";
import TextAreaStyle from "./styles/TextAreaStyle";

class TextArea extends React.Component {
    constructor(props) {
        super(props);

        this.DOM = React.createRef();
    }

    componentDidMount() {
        this.setCaretPosition();
    }

    render() {
        return (
            <TextAreaStyle
                defaultValue={this.props.defaultValue}
                autoFocus={this.props.autoFocus || true}
                onKeyDown={this.props.onKeyDown}
                onBlur={this.props.onBlur}
                height={this.props.height}
                className={this.props.className}
                ref={this.DOM}
            />
        )
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    setCaretPosition() {
        const element = this.DOM.current;
        element.scrollTop = element.scrollHeight;
        const endPosition = element.value.length;
        this.DOM.current.setSelectionRange(endPosition, endPosition);
    }
}

export default TextArea;