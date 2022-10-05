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
     * Sends data to the server and returns true if successful or false if not.
     * @param {Array} data 
     * @returns {boolean}
     */
    async #setData(data) {
        const dataString = JSON.stringify(data);
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
}

export default RemoteStorageService;