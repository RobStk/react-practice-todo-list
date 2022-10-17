import React from "react";
import TimerStyle from "./styles/TimerStyle";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.timer = this.props.timeProvider;
        const date = this.timer.getDateDashed();
        const time = this.timer.getTimeWithColons();
        this.state = {
            date: date,
            time: time
        }
    }
    componentDidMount() {
        setInterval(() => { this.updateTimer() }, 1000);
    }

    render() {
        return (
            <TimerStyle>
                <div>{this.state.date}</div>
                <div>{this.state.time}</div>
            </TimerStyle>
        );
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    updateTimer() {
        const date = this.timer.getDateDashed();
        const time = this.timer.getTimeWithColons();
        this.setState({
            date: date,
            time: time
        });
    }
}

export default Timer;