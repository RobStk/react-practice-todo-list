import Connection from "../connection";
import QueryQueue from "./query-queue";
import { eventsManager, events } from "./events-manager";

class QueryManager {
    /* ------------------------ */
    /* Private properties       */
    /* ------------------------ */

    /** Path to database. */
    #dbPath;

    /** An object that handles connections to the database. */
    #db;

    /** The query buffer. */
    #queryQueue;

    /** Global events manager. */
    #eventsManager;

    /** An object containing the event types. */
    #events;

    /* ------------------------ */
    /* Constructor              */
    /* ------------------------ */
    /**
     * @param {String} dbPath Path to database.
     */
    constructor(dbPath) {
        this.#dbPath = dbPath;
        this.#db = new Connection(dbPath);
        this.#queryQueue = new QueryQueue();
        this.#eventsManager = eventsManager;
        this.#events = events;
    }

    /* ------------------------ */
    /* Getters/setters          */
    /* ------------------------ */

    get connect() { return this.#connect }
    get getTasks() { return this.#getTasks }
    get getTaskBy() { return this.#getTaskBy }
    get addTask() { return this.#addTask }
    get updateTask() { return this.#updateTask }
    get deleteTask() { return this.#deleteTask }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    //TODO Dokumentacja
    async #connect() {
        const connection = await this.#queryQueue.emit();
        if (connection.error && connection.error !== 404) this.#eventsManager.emit(this.#events.connectionError);
        else this.#eventsManager.emit(this.#events.connectionCorrect);
        return connection;
    }

    // ------------------------

    async #getTasks() {
        const query = await this.#db.get();
        if (query.error) eventsManager.emit(events.connectionError);
        return query;
    }

    // ------------------------

    /**
     * @param {String} key Searching key.
     * @param {String} value Searching value.
     * @returns {Object} Query result object with data/error properties.
     */
    async #getTaskBy(key, value) {
        const searchingPath = this.#dbPath + '?' + key + '=' + value;
        const query = await this.#db.get(searchingPath);
        if (query.error) eventsManager.emit(events.connectionError);
        return query;
    }

    // ------------------------

    async #addTask(task) {
        this.#queryQueue.add(this.#db.post, task);
        const query = await this.#connect();
        return query;
    }

    // ------------------------

    /**
     * @param {Object} task Task to update.
     * @returns {Object} Object with error property.
     */
    async #updateTask(task) {
        let taskPath = '';
        const id = task.id;
        const tempId = task.tempId;

        if (id) {
            taskPath = this.#dbPath + "/" + id;
        }
        if (!id && tempId) { taskPath = this.#dbPath + "?tempId=" + tempId }

        const query = await this.#db.get(taskPath);

        if (query.error) {
            this.#eventsManager.emit(events.connectionError);
            return query;
        }

        if (query.data) {
            const dbData = query.data[0] || query.data;
            if (dbData.id) {
                task.id = dbData.id;
                delete task.tempId;
                if (dbData.tempId) delete dbData.tempId;
                taskPath = this.#dbPath + "/" + task.id;
                task = { ...dbData, ...task };

                this.#queryQueue.add(this.#db.put, task);
            }
            return query;
        }
    }

    // ------------------------

    async #deleteTask(task) {
        const id = task.props.id;

        if (id) {
            this.#queryQueue.add(this.#db.delete, id);
            return { error: false };
        }

        if (!id) {
            const tempId = task.props.tempId;
            const query = await this.#getTaskBy("tempId", tempId);
            if (!query.error) {
                const dbTask = query.data[0] || query.data;
                if (dbTask) {
                    this.#queryQueue.add(this.#db.delete, dbTask.id);
                    return query;
                }
            }
            else if (query.error) {
                this.#queryQueue.add(this.#deleteTask.bind(this), task);
                this.#eventsManager.emit(events.connectionError);
                return query;
            }
        }
    }

    // ------------------------
}

export default QueryManager;