class LocalStorageBroker {

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    /**
     * Returns an array of tasks retrieved from local storage.
     * @returns Tasks array
     */
    getTasks() {
        const tasksString = localStorage.getItem("tasks");
        const tasksArray = tasksString ? JSON.parse(tasksString) : [];
        return tasksArray;
    }

    // ------------------------

    /**
     * Stringifies and places the received tasks in the local storage.
     * @param {Object[]} tasks 
     */
    setTasks(tasks) {
        const tasksString = JSON.stringify(tasks);
        localStorage.setItem("tasks", tasksString);
    }

    // ------------------------
}

export default LocalStorageBroker;