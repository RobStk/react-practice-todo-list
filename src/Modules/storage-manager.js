/**
 * @typedef {import('./local-storage-service').default} LocalStorageService
 * @typedef {import('./remote-storage-service').default} RemoteStorageService
 * @typedef {import('./arrays-synchronizer').default} ArraySynchronizer
 * @typedef {import('./time-service').default} TimeService
 */
class StorageManager {
    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getData() { return this.#getData }
    get setData() { return this.#setData }
    get addItem() { return this.#addItem }
    get replaceItem() { return this.#replaceItem }
    get deleteItem() { return this.#deleteItem }
    get synchronize() { return this.#synchronize }

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #localService
    #remoteService;
    #arraySynchronizer;
    #timeService;

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {LocalStorageService} localService        Local storage object.
     * @param {RemoteStorageService} remoteService      Remote storage object.
     * @param {ArraySynchronizer} arraySynchronizer     Array synchronizer service object.
     * @param {TimeService} timeService                 Service for acquiring time for items.
     */
    constructor(localService, remoteService, arraySynchronizer, timeService) {
        this.#localService = localService;
        this.#remoteService = remoteService;
        this.#arraySynchronizer = arraySynchronizer;
        this.#timeService = timeService;
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
    };

    // ------------------------

    /**
     * Adds item and syncs storage.
     * @param {Object} itemToAdd 
     */
    #addItem(itemToAdd) {
        const timeString = this.#timeService.getDateAndTimeString();
        itemToAdd.creationDate = timeString;
        itemToAdd.lastUpdate = timeString;
        this.#localService.addItem(itemToAdd);
        this.synchronize();
    };

    // ------------------------

    /**
     * @param {Object} itemToReplace 
     */
    #replaceItem(itemToReplace) {
        itemToReplace.lastUpdate = this.#timeService.getDateAndTimeString();
        this.#localService.replaceItem(itemToReplace);
        this.synchronize();
    };

    // ------------------------

    /**
     * @param {Object} itemToDelete 
     */
    #deleteItem(itemToDelete) {
        itemToDelete.lastUpdate = this.#timeService.getDateAndTimeString();
        this.#localService.deleteItem(itemToDelete);
        this.synchronize();
    };

    // ------------------------

    /**
     * Synchronizes data from local storage with data from remote storage 
     * based on the last modification date
     */
    #synchronize() {
        const remoteData = this.#remoteService.getData();
        const remoteDataIsArray = Array.isArray(remoteData);
        if (!remoteDataIsArray) return;
        const localData = this.getData();
        localData.map((item) => delete item.tempId);
        const synchronizedData = this.#arraySynchronizer.synchronize(localData, remoteData);
        this.setData(synchronizedData);
        this.#remoteService.setData(synchronizedData);
    };

    // ------------------------

}

export default StorageManager;