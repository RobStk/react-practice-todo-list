import RemoteStorageService from "../remote-storage-service";

const resolvedGetMock = () =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(
            [
                { id: 1, content: "content1" },
                { id: 2, content: "content2" }
            ]
        )
    });

const resolvedSetMock = () => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(
        { id: 1, content: "content1" }
    )
});
const rejectedMock = () => Promise.reject({ status: "error test" });

const url = "url";
const remoteService = new RemoteStorageService(url);

describe("interface", () => {
    it("should be implemented", () => {
        const getDataIsImplemented = remoteService.getData !== undefined;
        const addItemIsImplemented = remoteService.addItem !== undefined;
        const updateItemIsImplemented = remoteService.updateItem !== undefined;

        expect.assertions(3);
        expect(getDataIsImplemented).toBeTruthy();
        expect(addItemIsImplemented).toBeTruthy();
        expect(updateItemIsImplemented).toBeTruthy();
    });
});

describe("getData method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call fetch with url", () => {
        global.fetch = jest.fn(resolvedGetMock);

        remoteService.getData();
        expect.assertions(1);
        expect(fetch).toBeCalledWith(url);
    });

    it("should return data array", async () => {
        global.fetch = jest.fn(resolvedGetMock);

        const data = await remoteService.getData();
        const dataIsArray = Array.isArray(data);

        expect.assertions(2);
        expect(dataIsArray).toBeTruthy();
        expect(data).toStrictEqual([
            { id: 1, content: "content1" },
            { id: 2, content: "content2" }
        ]);
    });

    it("should return null if reject", async () => {
        global.fetch = jest.fn(rejectedMock);

        const data = await remoteService.getData();

        expect.assertions(1);
        expect(data).toBe(null);
    });

    it("should output an error message to the console", async () => {
        global.fetch = jest.fn(rejectedMock);
        global.console.error = jest.fn();
        const errorMsg = "Http error: error test";

        await remoteService.getData();

        expect.assertions(1);
        expect(console.error).toBeCalledWith(errorMsg);
    });
});

describe("addItem method", () => {
    const data = { content: "content1", lastUpdate: "1" };

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call fetch with right url and init object", async () => {
        let url = "";
        let options = {};

        global.fetch = jest.fn((input, init) =>
            new Promise((resolve) => {
                url = input;
                options = init;
                resolve({ ok: true });
            })
        );
        await remoteService.addItem(data);

        const bodyIsString = typeof options.body === "string";

        expect.assertions(4);
        expect(fetch).toBeCalled();
        expect(url).toBe("url");
        expect(options.method).toBe("post");
        expect(bodyIsString).toBeTruthy();
    });

    it("should return id if resolved", async () => {
        global.fetch = jest.fn(resolvedSetMock);
        const response = await remoteService.addItem(data);
        expect.assertions(1);
        const responseIsNumber = typeof response === "number";
        expect(responseIsNumber).toBeTruthy();
    });

    it("should return false if rejected", async () => {
        global.fetch = jest.fn(rejectedMock);
        const response = await remoteService.addItem(data);
        expect.assertions(1);
        expect(response).toBeFalsy();
    });

    it("should output an error message to the console", async () => {
        global.fetch = jest.fn(rejectedMock);
        global.console.error = jest.fn();
        const errorMsg = "Http error: error test";
        await remoteService.addItem(data);
        expect.assertions(1);
        expect(console.error).toBeCalledWith(errorMsg);
    });
});

describe("updateItem method", () => {
    const data = { id: 1, content: "content1", lastUpdate: "1" };

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call fetch with right url and init object", async () => {
        let url = "";
        let options = {};

        global.fetch = jest.fn((input, init) =>
            new Promise((resolve) => {
                url = input;
                options = init;
                resolve({ ok: true });
            })
        );
        await remoteService.updateItem(data);

        const bodyIsString = typeof options.body === "string";

        expect.assertions(4);
        expect(fetch).toBeCalled();
        expect(url).toBe("url/1");
        expect(options.method).toBe("put");
        expect(bodyIsString).toBeTruthy();
    });

    it("should return true if resolved", async () => {
        global.fetch = jest.fn(resolvedSetMock);
        const response = await remoteService.updateItem(data);
        expect.assertions(1);
        expect(response).toBe(true);
    });

    it("should return false if rejected", async () => {
        global.fetch = jest.fn(rejectedMock);
        const response = await remoteService.updateItem(data);
        expect.assertions(1);
        expect(response).toBe(false);
    });

    it("should output an error message to the console", async () => {
        global.fetch = jest.fn(rejectedMock);
        global.console.error = jest.fn();
        const errorMsg = "Http error: error test";
        await remoteService.updateItem(data);
        expect.assertions(1);
        expect(console.error).toBeCalledWith(errorMsg);
    });

    it("should delete tempId", async () => {
        const data = { id: 1, tempId: 2 };
        let options = null;
        global.fetch = jest.fn((input, init) =>
            new Promise((resolve) => {
                options = init;
                resolve({ ok: true });
            })
        );
        await remoteService.updateItem(data);
        expect.assertions(1);
        expect(options.body).toBe(JSON.stringify({ id: 1 }));
    });
});