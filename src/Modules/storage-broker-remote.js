// eslint-disable-next-line no-unused-vars
import Connection from "../utilities/connection";

class RemoteStorageBroker {

    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #dbConnection;

    /* ------------------------ */
    /* getters/setters          */
    /* ------------------------ */

    get getTasks() { return this.#getTasks };
    get sendTasks() { return this.#sendTasks };

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    /**
     * Creates a RemoteStorageBroker.
     * @param {Connection} dbConnectionInterface 
     */
    constructor(dbConnectionInterface) {
        this.#dbConnection = dbConnectionInterface;
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    async #getTasks() {
        const response = await this.#dbConnection.get();
        const output = { ...response };
        return output;
    }

    async #sendTasks(tasks) {
        const response = await this.#dbConnection.post(tasks);
        const output = { ...response };
        return output;
    }

}

export default RemoteStorageBroker;