import RemoteStorageService from "../remote-storage-service";

const getResolveMock = () =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(
            [
                { id: 1, content: "content1" },
                { id: 2, content: "content2" }
            ]
        )
    });

const setResolveMock = () => Promise.resolve({ ok: true });
const rejectedMock = () => Promise.reject({ status: "error test" });

const url = "url";
const remoteService = new RemoteStorageService(url);

describe("interface", () => {
    it("should be implemented", () => {
        const getDataIsImplemented = remoteService.getData !== undefined;
        const setDataIsImplemented = remoteService.setData !== undefined;

        expect.assertions(2);
        expect(getDataIsImplemented).toBeTruthy();
        expect(setDataIsImplemented).toBeTruthy();
    });
});

describe("getData method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call fetch with url", () => {
        global.fetch = jest.fn(getResolveMock);

        remoteService.getData();
        expect.assertions(1);
        expect(fetch).toBeCalledWith(url);
    });

    it("should return data array", async () => {
        global.fetch = jest.fn(getResolveMock);

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
    })
});

describe("setData method", () => {
    const data = [
        { id: 1, content: "content1" },
        { id: 2, content: "content2" }
    ];

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call fetch with url and correct options object", () => {
        global.fetch = jest.fn();
        remoteService.setData(data);
        expect.assertions(1);
        expect(fetch).toBeCalledWith(url, options);
    });

    it("should return true if resolve", async () => {
        global.fetch = jest.fn(setResolveMock);
        const response = await remoteService.setData();
        expect.assertions(1);
        expect(response).toBe(true);
    });

    it("should return false if reject", async () => {
        global.fetch = jest.fn(rejectedMock);
        const response = await remoteService.setData();
        expect.assertions(1);
        expect(response).toBe(false);
    });

    it("should output an error message to the console", async () => {
        global.fetch = jest.fn(rejectedMock);
        global.console.error = jest.fn();
        const errorMsg = "Http error: error test";
        await remoteService.setData();
        expect.assertions(1);
        expect(console.error).toBeCalledWith(errorMsg);
    });
});