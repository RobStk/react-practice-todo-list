class RemoteStorageService {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getData() { return this.#getData };
    get addItem() { return this.#addItem };
    get updateItem() { return this.#updateItem };

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #url;

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {string} url 
     */
    constructor(url) {
        this.#url = url;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * Returns a promise resolved to a data array or null.
     * @returns {Promise<Array|null>}
     */
    async #getData() {
        try {
            const response = await fetch(this.#url);
            if (!response.ok) throw new Error(response.status);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Http error: " + error.status);
            return null;
        }
    }

    // --------------------------

    /**
     * Adds data and return true if successful or false if not.
     * @param {Object} itemToAdd 
     * @returns {boolean}
     */
    async #addItem(itemToAdd) {
        const dataString = JSON.stringify(itemToAdd);
        try {
            const response = await fetch(this.#url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: dataString
            });
            if (!response.ok) throw new Error(response.status);
            return true;
        }
        catch (error) {
            console.error("Http error: " + error.status);
            return false;
        }
    }

    // --------------------------

    /**
     * Updates data and return true if successful or false if not.
     * @param {Object} itemToUpdate 
     * @returns {boolean}
     */
    async #updateItem(itemToUpdate) {
        const id = itemToUpdate.id;
        const tempId = itemToUpdate.tempId;
        if (id && tempId) delete itemToUpdate.tempId;
        const dataString = JSON.stringify(itemToUpdate);
        try {
            const response = await fetch(this.#url + "/" + id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: dataString
            });
            if (!response.ok) throw new Error(response.status);
            return true;
        }
        catch (error) {
            console.error("Http error: " + error.status);
            return false;
        }
    }

    // --------------------------
}

export default RemoteStorageService;