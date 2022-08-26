import { eventsManager, events } from "./events-manager";

class QueryQueue {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #queue;
    #eventsManager;
    #events;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */
    constructor() {
        this.#queue = [];
        this.#eventsManager = eventsManager;
        this.#events = events;

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
        // console.log("Dodano do kolejki:", fn, args.props || args);
        // console.log("Aktualna kolejka:");
        // let i = 0;
        // this.#queue.forEach(element => {
        //     console.log(i + ": ", element.fn, element.args.props || element.args);
        //     i++;
        // });
        // console.log("===");
    }

    // ------------------------

    /**
     * Complete tasks from the queue.
     * @returns {Object} Query result.
     */
    async emit() {
        let query = {};
        // console.log("this.#queue.length on start:", this.#queue.length);
        while (this.#queue.length) {
            // console.log("Próbuję wywołac funkcję:", this.#queue[0].fn);
            query = await this.#queue[0].fn(...this.#queue[0].args);
            if (query.error && query.error !== 404) return query;
            else {
                // console.log("Usuwam z kolejki:", this.#queue[0].fn, this.#queue[0].args.props || this.#queue[0].args);
                this.#queue = this.#queue.slice(1);
                // console.log("Aktualna kolejka:");
                // let i = 0;
                // this.#queue.forEach(element => {
                //     console.log(i + ": ", element.fn, element.args.props || element.args);
                //     i++;
                // });
                // console.log("===");
            }
        }
        return query;
    }

    // ------------------------
}

export default QueryQueue;