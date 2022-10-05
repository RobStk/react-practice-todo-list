import RemoteStorageService from "../remote-storage-service";

const fetchMock = () =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(
            [
                { id: 1, content: "content1" },
                { id: 2, content: "content2" }
            ]
        )
    });

const rejectedFetchMock = () => Promise.reject();

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
        global.fetch = jest.fn(fetchMock);

        remoteService.getData();
        expect.assertions(1);
        expect(fetch).toBeCalledWith(url);
    });

    it("should return data array", async () => {
        global.fetch = jest.fn(fetchMock);

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
        global.fetch = jest.fn(rejectedFetchMock);

        const data = await remoteService.getData();

        expect.assertions(1);
        expect(data).toBe(null);
    });
});