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
        const response = await fetch(pathToUpdate, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
        });
        console.log(response);
    }

    // ------------------------

    async delete(id) {
        const pathToDelete = this.url + "/" + id;
        const response = await fetch(pathToDelete, {
            method: "DELETE"
        });
        console.log(response);
    }
}

export default Connection;