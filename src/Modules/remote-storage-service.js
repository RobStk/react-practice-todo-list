class RemoteStorageService {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get getData() { return this.#getData };
    get setData() { return this.#setData };

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
            if (!response.ok) throw new Error();
            const data = await response.json();
            return data;
        }
        catch (error) {
            return null;
        }
    } //TODO

    // --------------------------

    #setData() { throw new Error("Not implemented method.") } //TODO

    // --------------------------
}

export default RemoteStorageService;