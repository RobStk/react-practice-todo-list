class LocalStorageService {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getData() { return this.#getData }
    get setData() { return this.#setData }
    get addItem() { return this.#addItem }
    get replaceItem() { return this.#replaceItem }
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
            this.#replaceItem(itemToAdd);
            return;
        };

        data.push(itemToAdd);
        this.setData(data);
    };

    // ------------------------

    /**
     * @param {Object} itemToReplace 
     */
    #replaceItem(itemToReplace) {
        this.#setIds(itemToReplace);
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
     * Checks and sets the correct id and temp id on the given object.
     * @param {Object} item 
     */
    #setIds(item) {
        if (!item.id && !item.tempId) {
            item.tempId = this.#getNewId();
        }
    };

    // ------------------------

    //TODO: doc
    #getNewId() {
        const idString = localStorage.getItem(this.#idStoreKey);
        const id = Number(idString);
        const newId = id + 1;
        const newIdString = newId.toString();
        localStorage.setItem(this.#idStoreKey, newIdString);
        return id;
    }

    // ------------------------

    //TODO: doc
    #resetId() {
        localStorage.setItem(this.#idStoreKey, "1");
    }

    // ------------------------
}

export default LocalStorageService;