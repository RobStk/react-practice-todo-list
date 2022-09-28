/**
 * @typedef ResponseObject
 * @property {Array|null} data
 * @property {number|null} error
 */
/**
 * @typedef RemoteSourceInterface
 * @property {function():ResponseObject} get
 * @property {function(Array):boolean} post
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
    get sendData() { return this.#sendData };

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    #getData() {
        const response = this.#source.get();
        const output = response ? response.data : null;
        return output;
    }

    // --------------------------

    #sendData(data) {
        const response = this.#source.post(data);
        const output = response;
        return output;
    }

    // --------------------------
}

export default StorageBrokerRemote;