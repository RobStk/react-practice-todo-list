import React from "react";
import RowSectionStyle from "../../Styles/RowSectionStyle";
import TaskAdderStyle from "./styles/TasksAdderStyle";
import { Input } from "../Input/Input";
import TaskIndicator from "../TaskIndicator/TaskIndicator";

class TasksAdder extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            isFocus: false,
            inputValue: ""
        }
    }
    render() {
        //TODO Callbacki do poprawy
        return (
            <TaskAdderStyle
                isFocus={this.state.isFocus}
                onClick={(event) => { this.handleClick(event) }}
                onSubmit={(event) => { this.handleSubmit(event) }}>

                <RowSectionStyle>
                    <TaskIndicator iconType="add" />
                    <Input
                        type="text"
                        autocomplete="off"
                        placeholder="Dodaj zadanie"
                        id="addTaskInput"
                        value={this.state.inputValue}
                        onFocus={() => { this.activate() }}
                        onBlur={() => { this.deactivate() }}
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleKeyDown}
                    />
                </RowSectionStyle>
            </TaskAdderStyle>
        );
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    activate() {
        this.setState({ isFocus: true });
    }

    // ------------------------

    deactivate() {
        this.setState({ isFocus: false });
    }

    // ------------------------

    handleClick(event) {
        event.preventDefault();
        document.querySelector("#addTaskInput").focus();
    }

    // ------------------------

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.inputValue) return;
        this.props.onTaskAdd({
            content: this.state.inputValue
        });
        this.setState({
            inputValue: ""
        })
    }

    // ------------------------

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        })
    }

    // ------------------------

    handleKeyDown(event) {
        if (event.code === "Escape") event.target.blur();
    }
}

export default TasksAdder;