class Connection {
    constructor(url) {
        this.url = url;
    }

    /* ------------------------ */
    /* Methods                  */
    /* ------------------------ */

    async get() {
        const response = await fetch(this.url);
        const data = await response.json();
        return data;
    }

    // ------------------------

    async post(newData) {
        const response = await fetch(this.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        });
        const data = await response.json();
        return data;
    }

    // ------------------------

    async put(newData) {
        const id = newData.id;
        const pathToUpdate = this.url + "/" + id;
        fetch(pathToUpdate, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        });
    }

    // ------------------------

    async delete(id) {
        const pathToDelete = this.url + "/" + id;
        fetch(pathToDelete, {
            method: "DELETE"
        });
    }
}

export default Connection;