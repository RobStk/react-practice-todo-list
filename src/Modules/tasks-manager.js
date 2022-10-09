/**
 * @typedef {import('./storage-manager').default} StorageManager
 */

class TasksManager {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getTasks() { return this.#getTasks }
    get addTask() { return this.#addTask }
    get updateTask() { return this.#updateTask }
    get deleteTask() { return this.#deleteTask }

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #storage;

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
        const storageData = this.#storage.getData() || [];
        const data = storageData.filter((task) => !task.deleted);
        return data
    }

    // ------------------------

    /**
     * @param {Object} task 
     */
    #addTask(task) {
        const isTaskCorrect = this.#checkTaskCorrectness(task);
        if (isTaskCorrect) this.#storage.addItem(task);
    }

    // ------------------------


    #updateTask(taskToUpdate) {
        const isTaskCorrect = this.#checkTaskCorrectness(taskToUpdate);
        if (isTaskCorrect) this.#storage.replaceItem(taskToUpdate);
    }

    // ------------------------

    #deleteTask(taskToDelete) {
        const taskIsCorrect = this.#checkTaskCorrectness(taskToDelete);
        if (taskIsCorrect) this.#storage.deleteItem(taskToDelete);
    };

    // ------------------------

    #checkTaskCorrectness(task) {
        const notObjectErrorMessage = "Argument must be an object.";
        if (!task) {
            console.error(notObjectErrorMessage);
            return false;
        }
        const taskIsNotObject = (typeof task !== "object");
        const taskIsArray = Array.isArray(task);
        const taskProps = Object.entries(task);
        const taskHasNoProperties = !taskProps.length;
        if (taskIsNotObject || taskIsArray || taskHasNoProperties) {
            console.error(notObjectErrorMessage);
            return false;
        }
        return true;
    }

    // ------------------------
}

export default TasksManager;