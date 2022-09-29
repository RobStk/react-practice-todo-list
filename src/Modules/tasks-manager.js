/**
 * @typedef {import('./storage-broker-local').default} StorageBrokerLocal
 * @typedef {import('./storage-broker-remote').default} StorageBrokerRemote
 * @typedef {import('./tasks-arrays-synchronizer').default} TasksArraySynchronizer
 */

class TasksManager {

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    #localStorageBroker;
    #remoteStorageBroker;
    #tasksArraysSynchronizer;

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getTasks() { return this.#getTasks }
    get setTasks() { return this.#setTasks }
    get addTask() { return this.#addTask }
    get synchronize() { return this.#synchronize }

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {StorageBrokerLocal} localStorageBroker 
     * @param {StorageBrokerRemote} remoteStorageBroker
     */
    constructor(localStorageBroker, remoteStorageBroker, tasksArraySynchronizer) {
        this.#localStorageBroker = localStorageBroker;
        this.#remoteStorageBroker = remoteStorageBroker;
        this.#tasksArraysSynchronizer = tasksArraySynchronizer;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * Returns tasks.
     * @returns {Array|null}    Tasks array
     */
    #getTasks() {
        return this.#localStorageBroker.getData();
    }

    // ------------------------

    /**
     * Sets received tasks.
     * @param {Task[]} tasks 
     */
    #setTasks(tasks) {
        this.#localStorageBroker.setData(tasks);
    }

    // ------------------------

    /**
     * Adds new Task
     * @param {Task} task 
     */
    #addTask(task) {
        const localTasks = this.#localStorageBroker.getData();
        localTasks.push(task);
        this.#localStorageBroker.setData(localTasks);
    }

    // ------------------------

    #synchronize() {
        const remoteTasks = this.#remoteStorageBroker.getData();

        const remoteTasksIsArray = Array.isArray(remoteTasks);
        if (!remoteTasksIsArray) return;

        const localTasks = this.#localStorageBroker.getData();
        const synchronizedTasks = this.#tasksArraysSynchronizer.synchronize(localTasks, remoteTasks);
        this.#localStorageBroker.setData(synchronizedTasks);
        this.#remoteStorageBroker.setData(synchronizedTasks);
    }

    // ------------------------
}

export default TasksManager;