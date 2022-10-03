import ArraySynchronizer from './arrays-synchronizer';

/**
 * @typedef {import('./local-storage-service').default} LocalStorageService
 * @typedef {import('./remote-storage-service').default} RemoteStorageService
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
    #syncKey;

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {LocalStorageService} localService        Local storage object.
     * @param {RemoteStorageService} remoteService      Remote storage object.
     * @param {string} [syncDateItemKey=lastUpdate]     Optional: Key under which the date 
     *                                                  to be synchronized is stored.
     */
    constructor(localService, remoteService, syncDateItemKey) {
        this.#localService = localService;
        this.#remoteService = remoteService;

        const defaultKey = "lastUpdate";
        const receivedKeyIsString = syncDateItemKey && (typeof syncDateItemKey === "string");
        this.#syncKey = receivedKeyIsString ? syncDateItemKey : defaultKey;
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
     * @param {Object} itemToAdd 
     */
    #addItem(itemToAdd) {
        this.#localService.addItem(itemToAdd);
    };

    // ------------------------

    /**
     * @param {Object} itemToReplace 
     */
    #replaceItem(itemToReplace) {
        this.#localService.replaceItem(itemToReplace)
    };

    // ------------------------

    /**
     * @param {Object} itemToDelete 
     */
    #deleteItem(itemToDelete) {
        this.#localService.deleteItem(itemToDelete);
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
        const localData = this.#getData();
        const synchronizedData = ArraySynchronizer.synchronize(localData, remoteData);
        this.#setData(synchronizedData);
        this.#remoteService.setData(synchronizedData);
    };

    // ------------------------

}

export default StorageManager;