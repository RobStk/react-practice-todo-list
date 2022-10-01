import LocalStorageService from "../local-storage-service";

//TODO Interface test

describe("getData method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    })

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
        const localStorageService = new LocalStorageService();
        getItemMock.mockReturnValue(dataString);

        const data = localStorageService.getData();

        expect(getItemMock).toBeCalledTimes(1);
        const isArray = Array.isArray(data);
        expect(isArray).toBeTruthy();
        expect(data).toHaveLength(2);
        expect(data[1].content).toBe("Item 2 content");
    });
});

describe("setData method", () => {
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
        const localStorageService = new LocalStorageService("test");

        localStorageService.setData(dataObj);

        expect(setItemMock).toBeCalledTimes(1);
        const dataStr = JSON.stringify(dataObj);
        expect(setItemMock).toBeCalledWith("test", dataStr);
    });
});