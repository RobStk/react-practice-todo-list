class ArraySynchronizer {

    /* ---------------------------------------------------- */
    /* Getters/Setters                                      */
    /* ---------------------------------------------------- */
    get synchronize() { return this.#synchronize };
    get findChanged() { return this.#findChanged };

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
        sumArray.sort((el1, el2) => {
            return el2[key] - el1[key];
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

    // ------------------------

    /**
     * Returns an array containing only those elements of the compared array that have a higher value of the comparison key or do not yet have an id.
     * @param {Array} comparedArray 
     * @param {Array} baseArray 
     * @returns {Array}
     */
    #findChanged(baseArray, comparedArray) {
        const base = [...baseArray];
        const compared = [...comparedArray];
        const key = this.#syncKey;
        const outputArray = [];

        compared.forEach(element => {
            const id = element.id;
            if (!id) outputArray.push(element);
            else {
                const baseElement = base.find((el) => el.id === id);
                if (element[key] > baseElement[key]) outputArray.push(element);
            }
        });
        return outputArray;
    }

    // ------------------------
}

export default ArraySynchronizer;