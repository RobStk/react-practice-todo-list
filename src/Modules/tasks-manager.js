/**
 * @typedef StorageBrokerLocal
 * @property {function() : Array} getData
 * @property {function(Array)} setData
 */
/**
 * @typedef StorageBrokerRemote
 * @property {function() : Array|null} getData
 * @property {function(Array): bool} setData
 */

class TasksManager {

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    #localStorageBroker;
    #remoteStorageBroker;

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {StorageBrokerLocal} localStorageBroker 
     * @param {StorageBrokerRemote} remoteStorageBroker 
     */
    constructor(localStorageBroker, remoteStorageBroker) {
        this.#localStorageBroker = localStorageBroker;
        this.#remoteStorageBroker = remoteStorageBroker;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * Returns tasks.
     * @returns {Array|null}    Tasks array
     */
    getTasks() {
        return this.#localStorageBroker.getData();
    }

    // ------------------------

    /**
     * Sets received tasks.
     * @param {Object[]} tasks 
     */
    setTasks(tasks) {
        this.#localStorageBroker.setData(tasks);
    }

    // ------------------------
}

export default TasksManager;