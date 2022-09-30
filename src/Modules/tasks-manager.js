/**
 * @typedef {import('./storage-manager').default} StorageManager
 */

class TasksManager {

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    #storage;

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getTasks() { return this.#getTasks }
    get addTask() { return this.#addTask }

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {StorageManager} storageManager 
     */
    constructor(storageManager) {
        this.#storage = storageManager;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * Returns tasks array from storage.
     * @returns {Array} Tasks array form storage.
     */
    #getTasks() {
        const data = this.#storage.getData() || [];
        return data
    }

    // ------------------------

    /**
     * @param {Object} task 
     */
    #addTask(task) {
        const notObjectErrorMessage = "Argument must be an object.";
        if (!task) {
            console.error(notObjectErrorMessage);
            return;
        }
        const taskIsNotObject = (typeof (task) !== "object");
        const taskIsArray = Array.isArray(task);
        const taskProps = Object.entries(task);
        const taskHasNoProperties = !taskProps.length;
        if (taskIsNotObject || taskIsArray || taskHasNoProperties) {
            console.error(notObjectErrorMessage);
            return;
        }
        this.#storage.addItem(task);
    }

    // ------------------------
}

export default TasksManager;