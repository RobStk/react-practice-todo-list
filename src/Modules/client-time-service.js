class ClientTimeService {
    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    /**
     * @returns {string} Current time accurate to milliseconds with date.
     */
    getFullTimeRaw() {
        const fullDate = this.getDateRaw();
        const time = this.getTimeRaw();
        const fullTime = fullDate + time;
        return fullTime;
    }

    // ------------------------

    /**
     * @returns {string} Current date in a strict string.
     */
    getDateRaw() {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        const fullDate = year.toString() + month.toString() + day.toString();
        return fullDate;
    }

    // ------------------------

    /**
     * @returns {string} Current date separated by dashes.
     */
    getDateDashed() {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        const fullDate = year.toString() + "-" + month.toString() + "-" + day.toString();
        return fullDate;
    }

    // ------------------------

    /**
     * @returns {string} Current time accurate to milliseconds in a strict string.
     */
    getTimeRaw() {
        const date = new Date();
        let hour = date.getHours();
        if (hour < 10) hour = "0" + hour;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let seconds = date.getSeconds();
        if (seconds < 10) seconds = "0" + seconds;
        let milliseconds = date.getMilliseconds();
        if (milliseconds < 10) milliseconds = "0" + milliseconds;
        if (milliseconds < 100) milliseconds = "0" + milliseconds;
        const time = hour.toString() + minutes.toString() + seconds.toString() + milliseconds.toString();
        return time;
    }

    // ------------------------

    /**
     * @returns {string} Current time accurate to seconds separated by colons.
     */
    getTimeWithColons() {
        const date = new Date();
        let hour = date.getHours();
        if (hour < 10) hour = "0" + hour;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let seconds = date.getSeconds();
        if (seconds < 10) seconds = "0" + seconds;
        let milliseconds = date.getMilliseconds();
        if (milliseconds < 10) milliseconds = "0" + milliseconds;
        if (milliseconds < 100) milliseconds = "0" + milliseconds;
        const time = hour.toString() + ":" + minutes.toString() + ":" + seconds.toString();
        return time;
    }
}

export default ClientTimeService;