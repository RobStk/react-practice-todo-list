class EventsService {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get subscribe() { return this.#subscribe }
    get emit() { return this.#emit }

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #idCounter;
    #subscribers;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */
    constructor() {
        this.#subscribers = {};
        this.#idCounter = 0;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * Adds subscriber of the event.
     * @param {string} event 
     * @param {Function} fn 
     * @returns 
     */
    #subscribe(event, fn) {
        const id = this.#idCounter;
        if (this.#subscribers[event] === undefined) this.#subscribers[event] = [];
        this.#subscribers[event].push({ id: id, fn: fn });
        this.#idCounter++;
        return id;
    }

    /**
     * Emits an event.
     * @param {string} event 
     * @param {*} data 
     * @returns 
     */
    #emit(event, data) {
        if (this.#subscribers[event] === undefined) return;
        this.#subscribers[event].forEach(el => el.fn(data));
    }

}
export default EventsService;