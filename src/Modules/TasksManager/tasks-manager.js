import LocalStorageBroker from "./LocalStorageBroker/local-storage-broker";

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

    getTasks() {
        //TODO
        console.warn("Not implemented method.");
        return this.#localStorageBroker.getTasks();
    }

    // ------------------------

    setTasks(tasks) {
        //TODO
        console.warn("Not implemented method.");
        this.#localStorageBroker.setTasks(tasks);
    }

    // ------------------------
}

export default TasksManager;