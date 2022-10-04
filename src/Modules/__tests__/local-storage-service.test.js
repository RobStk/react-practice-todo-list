import LocalStorageService from "../local-storage-service";

const lsKey = "test";
const localService = new LocalStorageService(lsKey);

describe("Interface", () => {
    it("should be implemented", () => {
        const localService = new LocalStorageService();
        const getDataIsImplemented = (localService.getData !== undefined);
        const setDataIsImplemented = (localService.setData !== undefined);
        const addItemIsImplemented = (localService.addItem !== undefined);
        const replaceItemIsImplemented = (localService.replaceItem !== undefined);
        const deleteItemIsImplemented = (localService.deleteItem !== undefined);

        expect(getDataIsImplemented).toBeTruthy();
        expect(setDataIsImplemented).toBeTruthy();
        expect(addItemIsImplemented).toBeTruthy();
        expect(replaceItemIsImplemented).toBeTruthy();
        expect(deleteItemIsImplemented).toBeTruthy();
    });
});

describe("getData method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    const getItemMock = jest.spyOn(Storage.prototype, 'getItem');

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
        getItemMock.mockReturnValue(dataString);

        const data = localService.getData();

        expect.assertions(4);
        expect(getItemMock).toBeCalledTimes(1);
        const isArray = Array.isArray(data);
        expect(isArray).toBeTruthy();
        expect(data).toHaveLength(2);
        expect(data[1].content).toBe("Item 2 content");
    });

    it("should return empty array when it gets empty string", () => {
        const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
        getItemMock.mockReturnValue(null);

        const data = localService.getData();

        expect.assertions(3);
        expect(getItemMock).toBeCalledTimes(1);
        const isArray = Array.isArray(data);
        expect(isArray).toBeTruthy();
        expect(data).toHaveLength(0);
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

        localService.setData(dataObj);

        expect(setItemMock).toBeCalledTimes(1);
        const dataStr = JSON.stringify(dataObj);
        expect(setItemMock).toBeCalledWith("test", dataStr);
    });
});

describe("addItem method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    it("should call setData with correct argument", () => {
        const getDataMock = jest.spyOn(localService, "getData");
        const setDataMock = jest.spyOn(localService, "setData");

        const baseArray = [{ id: 1, content: "item1" }, { id: 2, content: "item2" }];
        const newItem = { id: 3, content: "item3" };
        const newArray = [...baseArray];
        newArray.push(newItem);

        getDataMock.mockReturnValue(baseArray);

        localService.addItem(newItem);

        expect.assertions(3);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);
        jest.restoreAllMocks();
        const newStorageData = localService.getData();
        expect(newStorageData).toStrictEqual(newArray);
    });

    it("should call setData with correct arguments if item has no id", () => {
        const localService = new LocalStorageService("test");
        const getDataMock = jest.spyOn(localService, "getData");
        const setDataMock = jest.spyOn(localService, "setData");

        const baseArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
        ];

        const newItem = { content: "item3" };
        const newArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
            { tempId: 1, content: "item3" }
        ];

        getDataMock.mockReturnValue(baseArray);

        localService.addItem(newItem);

        expect.assertions(4);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);
        jest.restoreAllMocks();
        const newStorageData = localService.getData();
        expect(newStorageData).toStrictEqual(newArray);

        jest.restoreAllMocks();
        const storageData = localService.getData();
        expect(storageData).toStrictEqual(newArray);
    });

    it("should call setData with correct arguments if item has no id and no tempId", () => {
        const baseArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
        ];

        const newItem = { content: "item3" };
        const newArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
            { tempId: 1, content: "item3" }
        ];

        const localService = new LocalStorageService("test");
        const getDataMock = jest.spyOn(localService, "getData");
        const setDataMock = jest.spyOn(localService, "setData");
        getDataMock.mockReturnValue(baseArray);

        localService.addItem(newItem);

        expect.assertions(5);

        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);

        const newItem2 = { content: "item4" };
        const newArray2 = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
            { tempId: 1, content: "item3" },
            { tempId: 2, content: "item4" }
        ];

        getDataMock.mockReturnValue(newArray);
        localService.addItem(newItem2);

        expect(getDataMock).toBeCalledTimes(2);
        expect(setDataMock).toBeCalledWith(newArray2);

        jest.restoreAllMocks();
        const storageData = localService.getData();
        expect(storageData).toStrictEqual(newArray2);
    });

    it("should replace item if it finds a storage item with the same id", () => {
        const baseArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" }
        ];

        const newItem = { id: 1, content: "item3" };
        const newArray = [
            { id: 2, content: "item2" },
            { id: 1, content: "item3" }
        ];

        const localService = new LocalStorageService(lsKey);
        const getDataMock = jest.spyOn(localService, "getData");
        const setDataMock = jest.spyOn(localService, "setData");
        getDataMock.mockReturnValue(baseArray);

        localService.addItem(newItem);
        expect.assertions(2);

        expect(getDataMock).toBeCalledTimes(2);
        expect(setDataMock).toBeCalledWith(newArray);
    });

    it("should replace item if it finds a storage item with the same tempId", () => {
        const baseArray = [
            { id: 1, content: "item1" },
            { tempId: 2, content: "item2" },
            { tempId: 3, content: "item3" },
        ];

        const newItem = { tempId: 3, content: "item4" };
        const newArray = [
            { id: 1, content: "item1" },
            { tempId: 2, content: "item2" },
            { tempId: 3, content: "item4" },
        ];

        const localService = new LocalStorageService(lsKey);
        const getDataMock = jest.spyOn(localService, "getData");
        const setDataMock = jest.spyOn(localService, "setData");
        getDataMock.mockReturnValue(baseArray);

        localService.addItem(newItem);
        expect.assertions(1);

        // expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);
    });
});

describe("replaceItem method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    it("should call setData with correct data if item has an id", () => {
        const baseArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2 old" },
            { id: 3, content: "item3" }
        ];

        const newItem = { id: 2, content: "item2 new" };
        const newArray = [
            { id: 1, content: "item1" },
            { id: 3, content: "item3" },
            newItem
        ];

        const getDataMock = jest.spyOn(localService, "getData");
        const setDataMock = jest.spyOn(localService, "setData");

        getDataMock.mockReturnValue(baseArray);

        localService.replaceItem(newItem);

        expect.assertions(4);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);
        jest.restoreAllMocks();
        const newStorageData = localService.getData();
        expect(newStorageData).toStrictEqual(newArray);

        jest.restoreAllMocks();
        const storageData = localService.getData();
        expect(storageData).toStrictEqual(newArray);
    });

    it("should call setData with correct arguments if item has no id", () => {
        const baseArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
            { tempId: 1, content: "item3 old" },
            { tempId: 2, content: "item4" }
        ];
        const newItem = { tempId: 1, content: "item3 new" };
        const newArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
            { tempId: 2, content: "item4" },
            newItem
        ];

        const getDataMock = jest.spyOn(localService, "getData");
        const setDataMock = jest.spyOn(localService, "setData");
        getDataMock.mockReturnValue(baseArray);

        localService.replaceItem(newItem);

        expect.assertions(3);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);

        jest.restoreAllMocks();
        const storageData = localService.getData();
        expect(storageData).toStrictEqual(newArray);
    });

    it("should call setData with correct arguments if item has no id and no tempId", () => {
        const baseArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
        ];

        const newItem = { content: "item3" };
        const newArray = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
            { tempId: 1, content: "item3" }
        ];

        const getDataMock = jest.spyOn(localService, "getData");
        const setDataMock = jest.spyOn(localService, "setData");
        getDataMock.mockReturnValue(baseArray);

        localService.replaceItem(newItem);

        expect.assertions(5);

        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);

        const newItem2 = { content: "item4" };
        const newArray2 = [
            { id: 1, content: "item1" },
            { id: 2, content: "item2" },
            { tempId: 1, content: "item3" },
            { tempId: 2, content: "item4" }
        ];

        getDataMock.mockReturnValue(newArray);
        localService.replaceItem(newItem2);

        expect(getDataMock).toBeCalledTimes(2);
        expect(setDataMock).toBeCalledWith(newArray2);

        jest.restoreAllMocks();
        const storageData = localService.getData();
        expect(storageData).toStrictEqual(newArray2);
    });
});

describe("deleteItem method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    it("should call setData with correct arguments if item has an id", () => {
        const baseArray = [
            { id: 1, content: "item1", deleted: false },
            { id: 2, content: "item2", deleted: false },
            { id: 3, content: "item3", deleted: false }
        ];
        const deletedItem = { id: 2, content: "item2" };
        const newArray = [
            { id: 1, content: "item1", deleted: false },
            { id: 3, content: "item3", deleted: false },
            { id: 2, content: "item2", deleted: true }
        ];

        const getDataMock = jest.spyOn(localService, "getData").mockReturnValue(baseArray);
        const setDataMock = jest.spyOn(localService, "setData");

        localService.deleteItem(deletedItem);

        expect.assertions(3);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);

        jest.restoreAllMocks();
        const storageData = localService.getData();
        expect(storageData).toStrictEqual(newArray);
    });

    it("should call setData with correct arguments if item has no id", () => {
        const baseArray = [
            { id: 1, content: "item1", deleted: false },
            { id: 2, content: "item2", deleted: false },
            { tempId: 1, content: "item3", deleted: false },
            { tempId: 2, content: "item4", deleted: false }
        ];
        const deletedItem = { tempId: 1, content: "item3" };
        const newArray = [
            { id: 1, content: "item1", deleted: false },
            { id: 2, content: "item2", deleted: false },
            { tempId: 2, content: "item4", deleted: false },
            { tempId: 1, content: "item3", deleted: true }
        ];

        const localService = new LocalStorageService("test");
        const getDataMock = jest.spyOn(localService, "getData").mockReturnValue(baseArray);
        const setDataMock = jest.spyOn(localService, "setData");

        localService.deleteItem(deletedItem);

        expect.assertions(3);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);

        jest.restoreAllMocks();
        const storageData = localService.getData();
        expect(storageData).toStrictEqual(newArray);
    });

    it("should call setData with correct arguments if item has no id and no tempId", () => {
        const baseArray = [
            { id: 1, content: "item1", deleted: false },
            { id: 2, content: "item2", deleted: false },
        ];
        const deletedItem = { content: "item3" };
        const newArray = [
            { id: 1, content: "item1", deleted: false },
            { id: 2, content: "item2", deleted: false },
            { tempId: 1, content: "item3", deleted: true }
        ];

        const localService = new LocalStorageService("test");
        const getDataMock = jest.spyOn(localService, "getData").mockReturnValue(baseArray);
        const setDataMock = jest.spyOn(localService, "setData");

        localService.deleteItem(deletedItem);

        expect.assertions(5);

        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);

        const deletedItem2 = { content: "item4" };
        const newArray2 = [
            { id: 1, content: "item1", deleted: false },
            { id: 2, content: "item2", deleted: false },
            { tempId: 1, content: "item3", deleted: true },
            { tempId: 2, content: "item4", deleted: true }
        ];

        getDataMock.mockReturnValue(newArray);
        localService.deleteItem(deletedItem2);

        expect(getDataMock).toBeCalledTimes(2);
        expect(setDataMock).toBeCalledWith(newArray2);

        jest.restoreAllMocks();
        const storageData = localService.getData();
        expect(storageData).toStrictEqual(newArray2);
    });

})