import DateTime from "./date-time";

class TimeService {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getDateAndTimeString() { return this.#getDateAndTimeString };


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * Returns current date and time accurate to milliseconds.
     * @returns {string}
     */
    #getDateAndTimeString() {
        const dateTime = DateTime.getFullTimeRaw();
        return dateTime;
    }
}

export default TimeService;