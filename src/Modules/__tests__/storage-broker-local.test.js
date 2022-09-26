import StorageBrokerLocal from "../storage-broker-local";

describe("StorageBrokerLocal getData method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    })

    it("should return an empty array when it gets no values", () => {
        let data = null;
        let isArray = undefined;
        const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
        const localStorageBroker = new StorageBrokerLocal();

        data = localStorageBroker.getData();
        expect(getItemMock).toBeCalledTimes(1);
        isArray = Array.isArray(data);
        expect(isArray).toBeTruthy();

        getItemMock.mockReturnValue(null);
        data = localStorageBroker.getData();
        expect(getItemMock).toBeCalledTimes(2);
        isArray = Array.isArray(data);
        expect(isArray).toBeTruthy();

        getItemMock.mockReturnValue(undefined);
        data = localStorageBroker.getData();
        expect(getItemMock).toBeCalledTimes(3);
        isArray = Array.isArray(data);
        expect(isArray).toBeTruthy();

        getItemMock.mockReturnValue("");
        data = localStorageBroker.getData();
        expect(getItemMock).toBeCalledTimes(4);
        isArray = Array.isArray(data);
        expect(isArray).toBeTruthy();
    });

    it("should return array of objects when it gets string", () => {
        const dataObj = [
            {
                "content": "Item 1 content"
            },
            {
                "content": "Item 2 content"
            }
        ];
        const dataString = JSON.stringify(dataObj);
        const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
        const localStorageBroker = new StorageBrokerLocal();

        getItemMock.mockReturnValue(dataString);
        const data = localStorageBroker.getData();
        expect(getItemMock).toBeCalledTimes(1);
        const isArray = Array.isArray(data);
        expect(isArray).toBeTruthy();
        expect(data).toHaveLength(2);
        expect(data[1].content).toBe("Item 2 content");
    });
});

describe("StorageBrokerLocal setData method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    it("should call setItem with correct arguments on localeStorage", () => {
        const dataObj = [
            {
                "content": "Item 1 content"
            },
            {
                "content": "Item 2 content"
            }
        ];
        const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
        const localStorageBroker = new StorageBrokerLocal("test");

        localStorageBroker.setData(dataObj);
        expect(setItemMock).toBeCalledTimes(1);
        const dataStr = JSON.stringify(dataObj);
        expect(setItemMock).toBeCalledWith("test", dataStr);
    });
});