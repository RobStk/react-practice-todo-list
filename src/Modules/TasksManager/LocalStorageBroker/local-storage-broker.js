class LocalStorageBroker {

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    getTasks() {
        //TODO
        console.warn("Not implemented method.");
        const tasks = localStorage.getItem("");
        return tasks || [];
    }

    setTasks(tasks) {
        //TODO
        console.warn("Not implemented method.");
    }

}

export default LocalStorageBroker;