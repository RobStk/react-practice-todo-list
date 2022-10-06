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

    /**
     * Returns an array that is a synchronization of two arrays based on a sync key.
     * @param {Array} array1 
     * @param {Array} array2 
     * @returns {Array}
     */
    #synchronize(array1, array2) {
        const key = this.#syncKey;
        const sumArray = [...array1, ...array2];
        sumArray.sort((arr1, arr2) => {
            return arr2[key] - arr1[key];
        });

        for (let i = 0; i < sumArray.length; i++) {
            const element = sumArray[i];
            const id = element.id;
            for (let j = i + 1; j < sumArray.length; j++) {
                const el = sumArray[j];
                if (el.id && el.id === id) sumArray.splice(j, 1);
            }
        }

        return sumArray;
    }
}

export default ArraySynchronizer;