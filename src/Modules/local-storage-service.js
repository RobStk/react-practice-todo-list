class LocalStorageService {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getData() { return this.#getData }
    get setData() { return this.#setData }
    get addItem() { return this.#addItem }
    get replaceItem() { return this.#replaceItem }
    get deleteItem() { return this.#deleteItem }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #localStorageKey
    #nextFreeId

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {string} localStorageItemName The name of the item under which the 
     *                                      data should be stored in Local.
     */
    constructor(localStorageItemName) {
        this.#localStorageKey = localStorageItemName;
        this.#nextFreeId = 1;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @returns {Array | null}
     */
    #getData() {
        const dataString = localStorage.getItem(this.#localStorageKey);
        const dataArr = dataString ? JSON.parse(dataString) : [];
        return dataArr;
    };

    // ------------------------

    /**
     * @param {Array} data Data array to set in storage.
     */
    #setData(data) {
        const dataString = JSON.stringify(data);
        localStorage.setItem(this.#localStorageKey, dataString);
    };

    // ------------------------

    /**
     * @param {Object} itemToAdd 
     */
    #addItem(itemToAdd) {
        const data = this.getData() || [];
        data.push(itemToAdd);
        this.setData(data);
    };

    // ------------------------

    /**
     * @param {Object} itemToReplace 
     */
    #replaceItem(itemToReplace) {
        if (!itemToReplace.id && !itemToReplace.tempId) {
            itemToReplace.tempId = this.#getNewTempId();
        }
        const id = itemToReplace.id;
        const tempId = itemToReplace.tempId;
        const data = this.getData();

        const newData = id ?
            data.filter((item) => item.id !== id)
            :
            data.filter((item) => item.tempId !== tempId)

        newData.push(itemToReplace);

        this.setData(newData);
    };

    // ------------------------

    /**
     * @param {Object} itemToDelete 
     */
    #deleteItem(itemToDelete) {
        itemToDelete.deleted = true;
        this.replaceItem(itemToDelete);
    };

    // ------------------------

    /**
     * @returns {number} New free temporary id number.
     */
    #getNewTempId() {
        const tempId = this.#nextFreeId;
        this.#nextFreeId++;
        return tempId;
    };

    // ------------------------
}

export default LocalStorageService;