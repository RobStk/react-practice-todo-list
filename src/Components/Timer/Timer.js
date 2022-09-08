import React from "react";
import TimeManager from "../../utilities/time-manager";
import TimerStyle from "./styles/TimerStyle";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        const timer = new TimeManager();
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
        const timer = new TimeManager();
        const date = timer.getDateDashed();
        const time = timer.getTimeWithColons();
        this.setState({
            date: date,
            time: time
        });
    }
}

export default Timer;