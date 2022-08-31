import { eventsManager, events } from "./events-manager";

class QueryQueue {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #queue;
    #eventsManager;
    #interval;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */
    constructor() {
        this.#queue = [];
        this.#eventsManager = eventsManager;

        this.#interval = setInterval(this.emit.bind(this), 5000);

        this.#eventsManager.on(events.dataUpdated, this.emit.bind(this));
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    /**
     * Adds functions to the queue.
     * @param {Function} fn Function to add.
     * @param  {...any} args Arguments for function.
     */
    add(fn, ...args) {
        this.#queue.push({ fn: fn, args: args });
    }

    // ------------------------

    /**
     * Complete tasks from the queue.
     * @returns {Object} Query result.
     */
    async emit() {
        let query = null;
        while (this.#queue.length) {
            query = {};
            query = await this.#queue[0].fn(...this.#queue[0].args);
            if (query.error && query.error !== 404) {
                this.#eventsManager.emit(events.connectionError);
                return query;
            }
            else {
                this.#queue = this.#queue.slice(1);
                if (!this.#queue.length) this.#eventsManager.emit(events.queryQueueCompleted);
            }
        }
        if (query) this.#eventsManager.emit(events.connectionCorrect);
        query = {};
        return query;
    }

    // ------------------------
}

export default QueryQueue;