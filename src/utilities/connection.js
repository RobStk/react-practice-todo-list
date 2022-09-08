class Connection {
    constructor(url) {
        this.url = url;
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    /**
     * @param {String} [url] 
     * @returns 
     */
    async get(url) {
        const path = url || this.url;
        const output = {};
        try {
            const response = await fetch(path);
            if (!response.ok) throw (response);
            const data = await response.json();

            output.data = data;
            output.error = null;

            return output;
        }
        catch (response) {
            // console.error(response);
            output.data = null;
            output.error = response.status || true;
            return output;
        }
    }

    // ------------------------

    async post(newData) {
        const output = {};
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData)
            });
            // console.log(response);
            if (!response.ok) throw response;
            const data = await response.json();

            output.data = data;
            output.error = false;

            return output;
        }
        catch (response) {
            // console.error(response);
            output.data = null;
            output.error = response.status || true;

            return output;
        }
    }

    // ------------------------

    /**
     * @param {Object} newData  Object containing data to PUT.
     * @param {String} [url]    Optional: Path to PUT.
     * @returns 
     */
    async put(newData) {
        const pathToUpdate = this.url + "/" + newData.id;
        const output = {};
        try {
            const response = await fetch(pathToUpdate, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newData)
            });
            if (!response.ok) throw response;
            if (response.ok) output.error = null;
            return output;
        }
        catch (response) {
            if (!response.ok) output.error = response.status || true;
            return output;
        }
    }

    // ------------------------

    async delete(id) {
        const output = {};
        const pathToDelete = this.url + "/" + id;
        try {
            const response = await fetch(pathToDelete, {
                method: "DELETE"
            });
            if (response.ok) output.error = false;
            if (!response.ok) throw response;
        }
        catch (response) {
            // console.log("delete status:", response);
            output.error = response.status || true;
        }
        return output;
    }
}

export default Connection;