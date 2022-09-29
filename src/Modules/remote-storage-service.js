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

    #getData() { console.warn("Not implemented method") } //TODO

    // --------------------------

    #setData() { console.warn("Not implemented method") } //TODO

    // --------------------------
}

export default RemoteStorageService;