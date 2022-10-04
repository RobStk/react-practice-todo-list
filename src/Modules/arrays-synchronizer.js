class ArraySynchronizer {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get synchronize() { return this.#synchronize };

    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #syncKey;

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {string} [syncKey=lastUpdate]     Optional: Key under which the date 
     *                                          to be synchronized is stored.
     *                                          Default: "lastUpdate"
     */
    constructor(syncKey) {
        const defaultKey = "lastUpdate";
        const receivedKeyIsString = syncKey && (typeof syncDateItemKey === "string");
        this.#syncKey = receivedKeyIsString ? syncKey : defaultKey;
    }

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */
    #synchronize() { throw new Error("Not implemented method."); }
}

export default ArraySynchronizer;