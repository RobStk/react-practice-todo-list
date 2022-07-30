import React from "react";
import Time from "../utilities/time";
import TimerStyle from "./Styles/TimerStyle";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        const timer = new Time();
        const date = timer.getDateDashed();
        const time = timer.getTimeWithColons();
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
        const timer = new Time();
        const date = timer.getDateDashed();
        const time = timer.getTimeWithColons();
        this.setState({
            date: date,
            time: time
        });
    }
}

export default Timer;