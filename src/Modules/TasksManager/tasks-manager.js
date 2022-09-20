import TasksLocalProvider from "./TasksLocalProvider/tasks-local-provider";

class TasksManager {

    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    #tasksLocalProvider;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */

    constructor() {
        this.#tasksLocalProvider = new TasksLocalProvider();
    }

    /* ------------------------ */
    /* Getters/Setters          */
    /* ------------------------ */

    get getTasks() { return this.#getTasks }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    #getTasks() {
        return this.#tasksLocalProvider.getTasks() || [];
    }
}

export default TasksManager;