class EventsManager {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #subscribers;
    #idCounter;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    constructor() {
        this.#subscribers = {};
        this.#idCounter = 0;
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    /**
     * Add subscriber of the event.
     * @param {String} event 
     * @param {Function} fn 
     */
    on(event, fn) {
        const id = this.#idCounter;
        if (this.#subscribers[event] === undefined) this.#subscribers[event] = [];
        this.#subscribers[event].push({ id: id, fn: fn });
        this.#idCounter++;
        return id;
    }

    // ------------------------

    /** 
     * Remove subscriber of the event.
     * @param {Number} id
     */
    off(id) {
        if (id) {
            for (let event of Object.keys(this.#subscribers)) {
                this.#subscribers[event] = this.#subscribers[event].filter(el => el.id !== id);
            }
        }
    }

    // ------------------------

    /** 
     * Emit all subscribers of the event.
     * @param {String} event 
     * @param {*} data 
     */
    emit(event, data) {
        if (this.#subscribers[event] === undefined) return;
        this.#subscribers[event].forEach(el => el.fn(data));
    }

    // ------------------------

    /** Remove all subscribers.*/
    reset() {
        this.#subscribers = {};
    }
}

const eventsManager = new EventsManager();
const events = {
    connectionError: "Connection error",
    connectionCorrect: "Connection correct",
    dataUpdated: "Data updated"
}

export default EventsManager;
export { eventsManager, events };