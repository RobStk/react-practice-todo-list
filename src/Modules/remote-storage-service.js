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
            console.error("Http error:", error.status || error);
            return null;
        }
    }

    // --------------------------

    /**
     * Adds data and return true if resolved or false if rejected.
     * @param {Object} itemToAdd 
     * @returns {Promise<boolean>}
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
            const jsonResult = await response.json()
            const id = jsonResult.id;
            return id;
        }
        catch (error) {
            console.error("Http error:", error.status || error);
            return null;
        }
    }

    // --------------------------

    /**
     * Updates data and return true if resolved or false if rejected.
     * @param {Object} itemToUpdate 
     * @returns {Promise<boolean>}
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
            console.error("Http error:", error.status || error);
            return false;
        }
    }

    // --------------------------
}

export default RemoteStorageService;