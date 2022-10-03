import ArraySynchronizer from "../arrays-synchronizer";
import LocalStorageService from "../local-storage-service";
import RemoteStorageService from "../remote-storage-service";
import StorageManager from "../storage-manager";

const localDB = new LocalStorageService("test");
const storageManager = new StorageManager(localDB);

Object.defineProperty(localDB, "getData", { value: jest.fn() });
Object.defineProperty(localDB, "setData", { value: jest.fn() });
Object.defineProperty(localDB, "replaceItem", { value: jest.fn() });
Object.defineProperty(localDB, "deleteItem", { value: jest.fn() });

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
    Object.defineProperty(localService, "getData", { value: jest.fn() });
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
    });

    const localDB = new LocalStorageService("test");
    Object.defineProperty(localDB, "addItem", { value: jest.fn() });

    it("should call addItem with correct arguments on localDB", () => {
        const newItem = { content: "itemContent" };
        const addItemMock = jest.spyOn(localDB, "addItem");

        const storageManager = new StorageManager(localDB);
        storageManager.addItem(newItem);

        expect.assertions(1);
        expect(addItemMock).toBeCalledWith(newItem);
    });

    //TODO: Should synchronize?
});

describe("replaceItem method", () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call setData with correct arguments on localDB", () => {
        const item = { id: 1, content: "item1" };
        const replaceItemMock = jest.spyOn(localDB, "replaceItem");

        storageManager.replaceItem(item);

        expect.assertions(1);
        expect(replaceItemMock).toBeCalledWith(item);
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
});

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