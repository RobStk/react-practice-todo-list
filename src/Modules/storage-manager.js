/**
 * @typedef {import('./local-storage-service').default} LocalStorageService
 * @typedef {import('./remote-storage-service').default} RemoteStorageService
 * @typedef {import('./arrays-synchronizer').default} ArraySynchronizer
 * @typedef {import('./client-time-service').default} TimeService
 * @typedef {import('./events-manager').default} EventsManager
 */
class StorageManager {
    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getData() { return this.#getData }
    get setData() { return this.#setData }
    get addItem() { return this.#addItem }
    get updateItem() { return this.#updateItem }
    get deleteItem() { return this.#deleteItem }
    get synchronize() { return this.#synchronize }

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #localService
    #remoteService;
    #arraySynchronizer;
    #timeService;
    #events

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {LocalStorageService} localService        Local storage object.
     * @param {RemoteStorageService} remoteService      Remote storage object.
     * @param {ArraySynchronizer} arraySynchronizer     Array synchronizer service object.
     * @param {TimeService} timeService                 Service for acquiring time for items.
     * @param {EventsManager} storageEventsManager      Storage events management object.
     */
    constructor(localService, remoteService, arraySynchronizer, timeService, storageEventsManager) {
        this.#localService = localService;
        this.#remoteService = remoteService;
        this.#arraySynchronizer = arraySynchronizer;
        this.#timeService = timeService;
        this.#events = storageEventsManager;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @returns {Array}
     */
    #getData() {
        const data = this.#localService.getData();
        return data;
    };

    // ------------------------

    /**
     * @param {Array}
     */
    #setData(data) {
        this.#localService.setData(data);
        this.#events.emit("new data set");
    };

    // ------------------------

    /**
     * Adds item and syncs storage.
     * @param {Object} itemToAdd 
     */
    #addItem(itemToAdd) {
        const timeString = this.#timeService.getFullTimeRaw();
        itemToAdd.creationDate = timeString;
        itemToAdd.lastUpdate = timeString;
        this.#localService.addItem(itemToAdd);
        this.#events.emit("new data set");
        this.synchronize();
    };

    // ------------------------

    /**
     * @param {Object} itemToReplace 
     */
    #updateItem(itemToReplace) {
        itemToReplace.lastUpdate = this.#timeService.getFullTimeRaw();
        this.#localService.updateItem(itemToReplace);
        this.#events.emit("new data set");
        this.synchronize();
    };

    // ------------------------

    /**
     * @param {Object} itemToDelete 
     */
    #deleteItem(itemToDelete) {
        itemToDelete.lastUpdate = this.#timeService.getFullTimeRaw();
        this.#localService.deleteItem(itemToDelete);
        this.#events.emit("new data set");
        this.synchronize();
    };

    // ------------------------

    /**
     * Synchronizes data from local storage with data from remote storage 
     * based on the last modification date
     */
    async #synchronize() {
        let serverResponded = true;

        const remoteData = await this.#remoteService.getData();
        const localData = this.getData();

        const remoteDataIsArray = Array.isArray(remoteData);
        if (!remoteDataIsArray) {
            this.#events.emit("remote connection fail");
            this.setData(localData);
            return false;
        }

        const latestData = this.#arraySynchronizer.synchronize(localData, remoteData);
        const updatedData = this.#arraySynchronizer.findChanged(remoteData, latestData);

        for (let index = 0; (index < updatedData.length) && serverResponded; index++) {
            serverResponded = false;
            const updatedItem = { ...updatedData[index] };
            const tempId = updatedItem.tempId;
            if (tempId) delete updatedItem.tempId;
            if (updatedItem.id) {
                serverResponded = await this.#remoteService.updateItem(updatedItem);
            } else {
                const storageId = await this.#remoteService.addItem(updatedItem);
                if (storageId) {
                    serverResponded = true;
                    const localItem = latestData.find(item => tempId && (item.tempId === tempId));
                    delete localItem.tempId;
                    localItem.id = storageId;
                }
            }
        }
        if (serverResponded) this.#events.emit("remote connection success");
        else this.#events.emit("remote connection fail");
        this.setData(latestData);
        if (serverResponded) this.#localService.resetId();
        return serverResponded;
    };

    // ------------------------

}

export default StorageManager;