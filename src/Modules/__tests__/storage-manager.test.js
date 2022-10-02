import ArraySynchronizer from "../arrays-synchronizer";
import LocalStorageService from "../local-storage-service";
import RemoteStorageService from "../remote-storage-service";
import StorageManager from "../storage-manager";

//TODO Interface test
describe("Interface", () => {
    it("should be implemented", () => {
        const storageManager = new StorageManager();
        const getDataIsImplemented = (storageManager.getData !== undefined);
        const setDataIsImplemented = (storageManager.setData !== undefined);
        const addItemIsImplemented = (storageManager.addItem !== undefined);
        const replaceItemIsImplemented = (storageManager.replaceItem !== undefined);
        const deleteItemIsImplemented = (storageManager.deleteItem !== undefined);
        const synchronizeIsImplemented = (storageManager.synchronize !== undefined);

        expect(getDataIsImplemented).toBeTruthy();
        expect(setDataIsImplemented).toBeTruthy();
        expect(addItemIsImplemented).toBeTruthy();
        expect(replaceItemIsImplemented).toBeTruthy();
        expect(deleteItemIsImplemented).toBeTruthy();
        expect(synchronizeIsImplemented).toBeTruthy();
    });
});

describe("getData method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const localService = new LocalStorageService();
    const storageManager = new StorageManager(localService);

    it("should return array of items", () => {
        const getDataMock = jest
            .spyOn(localService, "getData")
            .mockReturnValue(["items1", "items2", "items3"]);

        const data = storageManager.getData();
        expect(getDataMock).toHaveBeenCalledTimes(1);
        expect(data.length).toBe(3);
    });
});

describe("setData method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    const localService = new LocalStorageService();
    const storageManager = new StorageManager(localService);

    it("should call setItem with correct arguments on localDB", () => {
        const data = "test data";
        const setDataMock = jest.spyOn(localService, 'setData');

        storageManager.setData(data);
        expect(setDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith("test data");
    });

    //TODO: Should synchronize?
});

describe("addItem method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    const localDB = new LocalStorageService("test");
    Object.defineProperty(localDB, "getData", { value: jest.fn() });
    Object.defineProperty(localDB, "setData", { value: jest.fn() });

    it("should call setData with correct arguments on localDB", () => {
        const baseArray = [{ content: "item1" }, { content: "item2" }];
        const newItem = { content: "item3" };
        const newArray = [...baseArray];
        newArray.push(newItem);

        const getDataMock = jest.spyOn(localDB, "getData").mockReturnValue(baseArray);
        const setDataMock = jest.spyOn(localDB, "setData");

        const storageManager = new StorageManager(localDB);
        storageManager.addItem(newItem);

        expect.assertions(2);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);
    });

    //TODO: tempId
    //TODO: Should synchronize?
});

describe("replaceItem method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        localStorage.clear();
    });

    const localDB = new LocalStorageService("test");
    Object.defineProperty(localDB, "getData", { value: jest.fn() });
    Object.defineProperty(localDB, "setData", { value: jest.fn() });

    it("should call setData with correct arguments on localDB if item has an id", () => {
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

        const getDataMock = jest.spyOn(localDB, "getData").mockReturnValue(baseArray);
        const setDataMock = jest.spyOn(localDB, "setData");
        const storageManager = new StorageManager(localDB);

        storageManager.replaceItem(newItem);

        expect.assertions(2);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);
    });

    it("should call setData with correct arguments on localDB if item has no id", () => {
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

        const getDataMock = jest.spyOn(localDB, "getData").mockReturnValue(baseArray);
        const setDataMock = jest.spyOn(localDB, "setData");
        const storageManager = new StorageManager(localDB);

        storageManager.replaceItem(newItem);

        expect.assertions(2);
        expect(getDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith(newArray);
    });

    it("should call setData with correct arguments on localDB if item has no id and no tempId", () => {
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

        const getDataMock = jest.spyOn(localDB, "getData").mockReturnValue(baseArray);
        const setDataMock = jest.spyOn(localDB, "setData");
        const storageManager = new StorageManager(localDB);

        storageManager.replaceItem(newItem);

        expect.assertions(4);

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
        storageManager.replaceItem(newItem2);

        expect(getDataMock).toBeCalledTimes(2);
        expect(setDataMock).toBeCalledWith(newArray2);
    });

})

describe("synchronize method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const localService = new LocalStorageService();
    const remoteService = new RemoteStorageService();
    const storageManager = new StorageManager(localService, remoteService);

    const localDataArr = ["localData"];
    const remoteDataArr = ["remoteData"];
    const synchronizedData = ["synchronizedData"];

    it("should distribute synchronized data", () => {
        const lsGetMethod = jest.spyOn(localService, "getData").mockReturnValue(localDataArr);
        const rsGetMethod = jest.spyOn(remoteService, "getData").mockReturnValue(remoteDataArr);
        const lsSetMethod = jest.spyOn(localService, "setData");
        const rsSetMethod = jest.spyOn(remoteService, "setData");
        const synchronizeMethod = jest.spyOn(ArraySynchronizer, "synchronize").mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(8);
        expect(rsGetMethod).toBeCalledTimes(1);
        expect(lsGetMethod).toBeCalledTimes(1);
        expect(synchronizeMethod).toBeCalledTimes(1);
        expect(synchronizeMethod).toBeCalledWith(localDataArr, remoteDataArr);
        expect(lsSetMethod).toBeCalledTimes(1);
        expect(rsSetMethod).toBeCalledTimes(1);
        expect(lsSetMethod).toBeCalledWith(synchronizedData);
        expect(rsSetMethod).toBeCalledWith(synchronizedData);
    });

    it("should stop the procedure if receive null from remote storage", () => {
        const lsGetMethod = jest.spyOn(localService, "getData").mockReturnValue(localDataArr);
        const rsGetMethod = jest.spyOn(remoteService, "getData").mockReturnValue(null);
        const lsSetMethod = jest.spyOn(localService, "setData");
        const rsSetMethod = jest.spyOn(remoteService, "setData");
        const synchronizeMethod = jest.spyOn(ArraySynchronizer, "synchronize").mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(rsGetMethod).toBeCalledTimes(1);
        expect(lsGetMethod).not.toBeCalled();
        expect(synchronizeMethod).not.toBeCalled();
        expect(lsSetMethod).not.toBeCalled();
        expect(rsSetMethod).not.toBeCalled();
    });

    it("should stop the procedure if receive a number from remote storage", () => {
        const lsGetMethod = jest.spyOn(localService, "getData").mockReturnValue(localDataArr);
        const rsGetMethod = jest.spyOn(remoteService, "getData").mockReturnValue(1);
        const lsSetMethod = jest.spyOn(localService, "setData");
        const rsSetMethod = jest.spyOn(remoteService, "setData");
        const synchronizeMethod = jest.spyOn(ArraySynchronizer, "synchronize").mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(rsGetMethod).toBeCalledTimes(1);
        expect(lsGetMethod).not.toBeCalled();
        expect(synchronizeMethod).not.toBeCalled();
        expect(lsSetMethod).not.toBeCalled();
        expect(rsSetMethod).not.toBeCalled();
    });

    it("should stop the procedure if receive a string from remote storage", () => {
        const lsGetMethod = jest.spyOn(localService, "getData").mockReturnValue("string");
        const rsGetMethod = jest.spyOn(remoteService, "getData").mockReturnValue(1);
        const lsSetMethod = jest.spyOn(localService, "setData");
        const rsSetMethod = jest.spyOn(remoteService, "setData");
        const synchronizeMethod = jest.spyOn(ArraySynchronizer, "synchronize").mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(rsGetMethod).toBeCalledTimes(1);
        expect(lsGetMethod).not.toBeCalled();
        expect(synchronizeMethod).not.toBeCalled();
        expect(lsSetMethod).not.toBeCalled();
        expect(rsSetMethod).not.toBeCalled();
    });

    it("should stop the procedure if receive an object from remote storage", () => {
        const lsGetMethod = jest.spyOn(localService, "getData").mockReturnValue({});
        const rsGetMethod = jest.spyOn(remoteService, "getData").mockReturnValue(1);
        const lsSetMethod = jest.spyOn(localService, "setData");
        const rsSetMethod = jest.spyOn(remoteService, "setData");
        const synchronizeMethod = jest.spyOn(ArraySynchronizer, "synchronize").mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(rsGetMethod).toBeCalledTimes(1);
        expect(lsGetMethod).not.toBeCalled();
        expect(synchronizeMethod).not.toBeCalled();
        expect(lsSetMethod).not.toBeCalled();
        expect(rsSetMethod).not.toBeCalled();
    });
});