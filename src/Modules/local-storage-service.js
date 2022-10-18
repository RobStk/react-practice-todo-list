class LocalStorageService {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getData() { return this.#getData }
    get setData() { return this.#setData }
    get addItem() { return this.#addItem }
    get updateItem() { return this.#updateItem }
    get deleteItem() { return this.#deleteItem }
    get getNewId() { return this.#getNewId }
    get resetId() { return this.#resetId }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #localStorageKey
    #idStoreKey

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {string} localStorageItemName     The name of the item under which the 
     *                                          data should be stored in Local.
     */
    constructor(localStorageItemName) {
        this.#localStorageKey = localStorageItemName;
        this.#idStoreKey = "id";
        const id = localStorage.getItem(this.#idStoreKey);
        if (!id) this.#resetId();
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @returns {Array}
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
        this.#setIds(itemToAdd);
        const data = this.getData() || [];

        const itemExist = data.find((innerItem) => {
            if (innerItem.id && (innerItem.id === itemToAdd.id)) return true;
            if (innerItem.tempId && (innerItem.tempId === itemToAdd.tempId)) return true;
            return false;
        });

        if (itemExist) {
            this.#updateItem(itemToAdd);
            return;
        };

        data.push(itemToAdd);
        this.setData(data);
    };

    // ------------------------

    /**
     * @param {Object} itemToReplace 
     */
    #updateItem(itemToReplace) {
        this.#setIds(itemToReplace);
        const id = itemToReplace.id;
        const data = this.getData();

        let item = null;
        if (id) item = data.find(item => item.id === itemToReplace.id);
        if (!id) item = data.find(item => item.tempId === itemToReplace.tempId);
        if (item) Object.assign(item, itemToReplace);

        this.setData(data);
    };

    // ------------------------

    /**
     * @param {Object} itemToDelete 
     */
    #deleteItem(itemToDelete) {
        itemToDelete.deleted = true;
        this.updateItem(itemToDelete);
    };

    // ------------------------

    /**
     * Checks and sets the correct id and temp id on the given object.
     * @param {Object} item 
     */
    #setIds(item) {
        if (!item.id && !item.tempId) {
            item.tempId = this.#getNewId();
        }
    };

    // ------------------------

    /**
     * Returns a new free localStorage id and set new one.
     * @returns 
     */
    #getNewId() {
        const idString = localStorage.getItem(this.#idStoreKey);
        const id = Number(idString);
        const newId = id + 1;
        const newIdString = newId.toString();
        localStorage.setItem(this.#idStoreKey, newIdString);
        return id;
    }

    // ------------------------

    /**
     * Reset localStorage ids;
     */
    #resetId() {
        localStorage.setItem(this.#idStoreKey, "1");
    }

    // ------------------------
}

export default LocalStorageService;