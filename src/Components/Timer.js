import React from "react";
import TimerStyle from "./Styles/TimerStyle";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            time: ""
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
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        let hour = date.getHours();
        if (hour < 10) hour = "0" + hour;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let seconds = date.getSeconds();
        if (seconds < 10) seconds = "0" + seconds;
        this.setState({
            date: year + "-" + month + "-" + day,
            time: hour + ":" + minutes + ":" + seconds
        });
    }
}

export default Timer;