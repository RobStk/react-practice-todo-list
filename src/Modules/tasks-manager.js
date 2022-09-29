/**
 * @typedef {import('./storage-manager').default} StorageManager
 */

class TasksManager {

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    #storageManager;

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
        this.#storageManager = storageManager;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    #getTasks() { console.warn("Not implemented method") } //TODO

    // ------------------------

    #addTask() { console.warn("Not implemented method") } //TODO

    // ------------------------
}

export default TasksManager;