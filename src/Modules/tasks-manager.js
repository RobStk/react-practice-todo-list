import LocalStorageBroker from "./storage-broker-local";

class TasksManager {

    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #localStorageBroker;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    constructor() {
        this.#localStorageBroker = new LocalStorageBroker();
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    /**
     * Returns tasks.
     * @returns Tasks array
     */
    getTasks() {
        //TODO
        console.warn("Not implemented method.");
        return this.#localStorageBroker.getTasks();
    }

    // ------------------------

    /**
     * Sets received tasks.
     * @param {Object[]} tasks 
     */
    setTasks(tasks) {
        //TODO
        console.warn("Not implemented method.");
        this.#localStorageBroker.setTasks(tasks);
    }

    // ------------------------
}

export default TasksManager;