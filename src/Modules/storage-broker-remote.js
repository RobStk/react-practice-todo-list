/**
 * @typedef ResponseObject
 * @property {Array|null} data
 * @property {number|null} error
 */

class StorageBrokerRemote {
    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {RemoteSourceInterface} source 
     */
    constructor(source) {
        this.#source = source;
    }

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #source;

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */

    get getData() { return this.#getData };
    get setData() { return this.#setData };

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    #getData() {
        const response = this.#source.get();
        const output = response ? response.data : null;
        return output;
    }

    // --------------------------

    #setData(data) {
        const response = this.#source.post(data);
        const output = response;
        return output;
    }

    // --------------------------
}

export default StorageBrokerRemote;