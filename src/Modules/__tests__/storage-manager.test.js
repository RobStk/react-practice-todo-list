import ArraySynchronizer from "../arrays-synchronizer";
import LocalStorageService from "../local-storage-service";
import RemoteStorageService from "../remote-storage-service";
import StorageManager from "../storage-manager";

const localDB = new LocalStorageService("test");
const remoteDB = new RemoteStorageService("url");
const arraySynchronizer = new ArraySynchronizer();
const storageManager = new StorageManager(localDB, remoteDB, arraySynchronizer);

Object.defineProperty(localDB, "getData", { value: jest.fn() });
Object.defineProperty(localDB, "setData", { value: jest.fn() });
Object.defineProperty(localDB, "replaceItem", { value: jest.fn() });
Object.defineProperty(localDB, "deleteItem", { value: jest.fn() });

Object.defineProperty(remoteDB, "getData", { value: jest.fn() });
Object.defineProperty(remoteDB, "setData", { value: jest.fn() });

Object.defineProperty(arraySynchronizer, "synchronize", { value: jest.fn() });

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
    });

    it("should call setItem with correct arguments on localDB", () => {
        const data = "test data";
        const setDataMock = jest.spyOn(localDB, 'setData');

        storageManager.setData(data);
        expect(setDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith("test data");
    });
});

describe("addItem method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call addItem with correct arguments on localDB", () => {
        const newItem = { content: "itemContent" };
        const addItemMock = jest.spyOn(localDB, "addItem");

        storageManager.addItem(newItem);

        expect.assertions(1);
        expect(addItemMock).toBeCalledWith(newItem);
    });

    it("should call synchronize method", () => {
        const newItem = { id: 1, content: "content1", lastUpdate: "20221003" };
        const synchronizeMock = jest.spyOn(storageManager, "synchronize");

        storageManager.addItem(newItem);

        expect.assertions(1);
        expect(synchronizeMock).toBeCalled();
    });
});

describe("replaceItem method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call setData with correct arguments on localDB", () => {
        const replaceItemMock = jest.spyOn(localDB, "replaceItem");
        const item = { id: 1, content: "item1" };

        storageManager.replaceItem(item);

        expect.assertions(1);
        expect(replaceItemMock).toBeCalledWith(item);
    });

    it("should call synchronize method", () => {
        const synchronizeMock = jest.spyOn(storageManager, "synchronize");
        const item = { id: 1, content: "content1", lastUpdate: "20221003" };

        storageManager.replaceItem(item);

        expect.assertions(1);
        expect(synchronizeMock).toBeCalled();
    });
});

describe("deleteItem Method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call deleteItem with correct arguments on localDB", () => {
        const item = { id: 1, content: "item" };
        const deleteItemMock = jest.spyOn(localDB, "deleteItem");

        storageManager.deleteItem(item);

        expect.assertions(1);
        expect(deleteItemMock).toBeCalledWith(item);
    });

    it("should call synchronize method", () => {
        const synchronizeMock = jest.spyOn(storageManager, "synchronize");
        const item = { id: 1, content: "content1", lastUpdate: "20221003" };

        storageManager.deleteItem(item);

        expect.assertions(1);
        expect(synchronizeMock).toBeCalled();
    });
});

describe("synchronize method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const localDataArr = ["localData"];
    const remoteDataArr = ["remoteData"];
    const synchronizedData = ["synchronizedData"];

    const lsGetMock = jest.spyOn(localDB, "getData");
    const rsGetMock = jest.spyOn(remoteDB, "getData");
    const lsSetMock = jest.spyOn(localDB, "setData");
    const rsSetMock = jest.spyOn(remoteDB, "setData");
    const synchronizeMock = jest.spyOn(arraySynchronizer, "synchronize");

    it("should call synchronize method on arraySynchronizer with correct arguments", () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(remoteDataArr);

        storageManager.synchronize();

        expect.assertions(4);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).toBeCalledTimes(1);
        expect(synchronizeMock).toBeCalledTimes(1);
        expect(synchronizeMock).toBeCalledWith(localDataArr, remoteDataArr);
    });

    it("should pass local data without tempIds", () => {
        const localArrWithTempIds = [
            { content: "content", tempId: "1" },
            { content: "content", tempId: "2" }
        ]
        const localArrWithoutTempIds = [
            { content: "content" },
            { content: "content" }
        ]
        lsGetMock.mockReturnValue(localArrWithTempIds);
        rsGetMock.mockReturnValue(remoteDataArr);

        storageManager.synchronize();

        expect.assertions(4);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).toBeCalledTimes(1);
        expect(synchronizeMock).toBeCalledTimes(1);
        expect(synchronizeMock).toBeCalledWith(localArrWithoutTempIds, remoteDataArr);
    });

    it("should distribute synchronized data", () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(remoteDataArr);
        synchronizeMock.mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(synchronizeMock).toBeCalledTimes(1);
        expect(lsSetMock).toBeCalledTimes(1);
        expect(rsSetMock).toBeCalledTimes(1);
        expect(lsSetMock).toBeCalledWith(synchronizedData);
        expect(rsSetMock).toBeCalledWith(synchronizedData);
    });

    it("should stop the procedure if receive null from remote storage", () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(null);
        synchronizeMock.mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).not.toBeCalled();
        expect(synchronizeMock).not.toBeCalled();
        expect(lsSetMock).not.toBeCalled();
        expect(rsSetMock).not.toBeCalled();
    });

    it("should stop the procedure if receive a number from remote storage", () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(1);
        synchronizeMock.mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).not.toBeCalled();
        expect(synchronizeMock).not.toBeCalled();
        expect(lsSetMock).not.toBeCalled();
        expect(rsSetMock).not.toBeCalled();
    });

    it("should stop the procedure if receive a string from remote storage", () => {
        const lsGetMock = jest.spyOn(localDB, "getData").mockReturnValue("string");
        const rsGetMock = jest.spyOn(remoteDB, "getData").mockReturnValue(1);
        const lsSetMock = jest.spyOn(localDB, "setData");
        const rsSetMock = jest.spyOn(remoteDB, "setData");
        synchronizeMock.mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).not.toBeCalled();
        expect(synchronizeMock).not.toBeCalled();
        expect(lsSetMock).not.toBeCalled();
        expect(rsSetMock).not.toBeCalled();
    });

    it("should stop the procedure if receive an object from remote storage", () => {
        const lsGetMock = jest.spyOn(localDB, "getData").mockReturnValue({});
        const rsGetMock = jest.spyOn(remoteDB, "getData").mockReturnValue(1);
        const lsSetMock = jest.spyOn(localDB, "setData");
        const rsSetMock = jest.spyOn(remoteDB, "setData");
        synchronizeMock.mockReturnValue(synchronizedData);

        storageManager.synchronize();

        expect.assertions(5);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).not.toBeCalled();
        expect(synchronizeMock).not.toBeCalled();
        expect(lsSetMock).not.toBeCalled();
        expect(rsSetMock).not.toBeCalled();
    });
});