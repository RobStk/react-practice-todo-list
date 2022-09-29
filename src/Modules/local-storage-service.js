class LocalStorageService {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getData() { return this.#getData };
    get setData() { return this.#setData };


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #localStorageKey

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {string} localStorageItemName The name of the item under which the 
     *                                      data should be stored in Local.
     */
    constructor(localStorageItemName) {
        this.#localStorageKey = localStorageItemName;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @returns {Array | null}
     */
    #getData() {
        const dataString = localStorage.getItem(this.#localStorageKey);
        const dataArr = JSON.parse(dataString);
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
}

export default LocalStorageService;