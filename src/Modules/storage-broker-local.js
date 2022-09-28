class StorageBrokerLocal {
    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {string} item     The name of the item in local storage.
     */
    constructor(item) {
        this.#item = item;
    }

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #item

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */

    get getData() { return this.#getData }
    get setData() { return this.#setData }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * Returns an array with data from local storage.
     * @returns {Array} Data array
     */
    #getData() {
        const dataString = localStorage.getItem(this.#item);
        const dataArray = dataString ? JSON.parse(dataString) : [];
        return dataArray;
    }

    // --------------------------

    /**
     * Stringifies and sets the data into local storage.
     * @param {Array} data 
     */
    #setData(data) {
        const dataString = JSON.stringify(data);
        localStorage.setItem(this.#item, dataString);
    }

    // --------------------------
}

export default StorageBrokerLocal;