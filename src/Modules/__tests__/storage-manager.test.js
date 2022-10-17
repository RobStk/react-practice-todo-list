import ArraySynchronizer from "../arrays-synchronizer";
import LocalStorageService from "../local-storage-service";
import RemoteStorageService from "../remote-storage-service";
import StorageManager from "../storage-manager";
import TimeService from "../client-time-service";
import EventsManager from "../events-manager";

const localDB = new LocalStorageService("test");
const remoteDB = new RemoteStorageService("url");
const arraySynchronizer = new ArraySynchronizer();
const timeService = new TimeService();
const eventsManager = new EventsManager();
const storageManager = new StorageManager(localDB, remoteDB, arraySynchronizer, timeService, eventsManager);

Object.defineProperty(localDB, "getData", { value: jest.fn() });
Object.defineProperty(localDB, "setData", { value: jest.fn() });
Object.defineProperty(localDB, "replaceItem", { value: jest.fn() });
Object.defineProperty(localDB, "deleteItem", { value: jest.fn() });
Object.defineProperty(localDB, "resetId", { value: jest.fn() });

Object.defineProperty(remoteDB, "getData", { value: jest.fn() });
Object.defineProperty(remoteDB, "addItem", { value: jest.fn() });
Object.defineProperty(remoteDB, "updateItem", { value: jest.fn() });

Object.defineProperty(arraySynchronizer, "synchronize", { value: jest.fn() });
Object.defineProperty(arraySynchronizer, "findChanged", { value: jest.fn() });

Object.defineProperty(timeService, "getFullTimeRaw", { value: jest.fn() });

Object.defineProperty(eventsManager, "emit", { value: jest.fn() });

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
    const storageData = [
        { content: "item1", deleted: false },
        { content: "item2", deleted: true },
        { content: "item3", deleted: false }
    ];

    const localService = new LocalStorageService();
    const storageManager = new StorageManager(localService);

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should return array of items", () => {
        const getDataMock = jest
            .spyOn(localService, "getData")
            .mockReturnValue(storageData);

        const data = storageManager.getData();
        expect(getDataMock).toHaveBeenCalledTimes(1);
        expect(data.length).toBe(3);
    });
});

describe("setData method", () => {
    const data = [{ data: "data" }];

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call setItem with the right args on localDB", () => {
        const setDataMock = jest.spyOn(localDB, 'setData');

        storageManager.setData(data);
        expect(setDataMock).toBeCalledTimes(1);
        expect(setDataMock).toBeCalledWith([{ data: "data" }]);
    });

    it("should emit an event", () => {
        const emitMock = jest.spyOn(eventsManager, "emit");
        storageManager.setData(data);
        expect.assertions(1);
        expect(emitMock).toBeCalledWith("new data set");
    });
});

describe("addItem method", () => {
    const date = "20221008114501002";
    const getFullTimeRawMock = jest.spyOn(timeService, "getFullTimeRaw");

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call addItem with the right args on localDB", () => {
        const newItem = { content: "itemContent" };
        const addItemMock = jest.spyOn(localDB, "addItem");
        storageManager.addItem(newItem);
        expect.assertions(1);
        expect(addItemMock).toBeCalledWith(newItem);
    });

    it("should add creationDate property value to item", () => {
        const newItem = { content: "itemContent" };
        getFullTimeRawMock.mockReturnValue(date);

        expect.assertions(4);
        expect(newItem).not.toHaveProperty("creationDate");
        storageManager.addItem(newItem);
        expect(newItem).toHaveProperty("creationDate");
        const propIsString = typeof newItem.creationDate === "string";
        expect(propIsString).toBeTruthy();
        expect(newItem.creationDate).toBe(date);
    });

    it("should add lastUpdate property value to item", () => {
        const newItem = { content: "itemContent" };
        getFullTimeRawMock.mockReturnValue(date);

        expect.assertions(4);
        expect(newItem).not.toHaveProperty("lastUpdate");
        storageManager.addItem(newItem);
        expect(newItem).toHaveProperty("lastUpdate");
        const propIsString = typeof newItem.lastUpdate === "string";
        expect(propIsString).toBeTruthy();
        expect(newItem.lastUpdate).toBe(date);
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
    const date = "202210081145012";
    const getFullTimeRawMock = jest.spyOn(timeService, "getFullTimeRaw");

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call setData with the right args on localDB", () => {
        const replaceItemMock = jest.spyOn(localDB, "replaceItem");
        const item = { id: 1, content: "item1" };

        storageManager.replaceItem(item);

        expect.assertions(1);
        expect(replaceItemMock).toBeCalledWith(item);
    });

    it("should add lastUpdate property value to item", () => {
        const item = { id: 1, content: "item1" };
        getFullTimeRawMock.mockReturnValue(date);

        expect.assertions(4);
        expect(item).not.toHaveProperty("lastUpdate");
        storageManager.replaceItem(item);
        expect(item).toHaveProperty("lastUpdate");
        const propIsString = typeof item.lastUpdate === "string";
        expect(propIsString).toBeTruthy();
        expect(item.lastUpdate).toBe(date);
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
    const date = "202210081145012";
    const getFullTimeRawMock = jest.spyOn(timeService, "getFullTimeRaw");

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call deleteItem with the right args on localDB", () => {
        const item = { id: 1, content: "item" };
        const deleteItemMock = jest.spyOn(localDB, "deleteItem");

        storageManager.deleteItem(item);

        expect.assertions(1);
        expect(deleteItemMock).toBeCalledWith(item);
    });

    it("should add lastUpdate property value to item", () => {
        const item = { id: 1, content: "item1" };
        getFullTimeRawMock.mockReturnValue(date);

        expect.assertions(4);
        expect(item).not.toHaveProperty("lastUpdate");
        storageManager.deleteItem(item);
        expect(item).toHaveProperty("lastUpdate");
        const propIsString = typeof item.lastUpdate === "string";
        expect(propIsString).toBeTruthy();
        expect(item.lastUpdate).toBe(date);
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
    const synchronizedDataArr = ["synchronizedDataArr"];

    const lsGetMock = jest.spyOn(localDB, "getData");
    const lsSetMock = jest.spyOn(localDB, "setData");
    const rsGetMock = jest.spyOn(remoteDB, "getData");
    const rsAddMock = jest.spyOn(remoteDB, "addItem");
    const rsUpdateMock = jest.spyOn(remoteDB, "updateItem");
    const synchronizeMock = jest.spyOn(arraySynchronizer, "synchronize");
    const findChangedMock = jest.spyOn(arraySynchronizer, "findChanged");

    it("should call synchronize method on arraySynchronizer with the right args", async () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(remoteDataArr);
        findChangedMock.mockReturnValue([]);

        await storageManager.synchronize();

        expect.assertions(3);
        expect(lsGetMock).toBeCalledTimes(1);
        expect(synchronizeMock).toBeCalledTimes(1);
        expect(synchronizeMock).toBeCalledWith(localDataArr, remoteDataArr);
    });

    it("should call findChanged method on arraySynchronizer with the right args", async () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(remoteDataArr);
        synchronizeMock.mockReturnValue(synchronizedDataArr);
        findChangedMock.mockReturnValue([]);

        await storageManager.synchronize();

        expect.assertions(2);
        expect(findChangedMock).toBeCalledTimes(1);
        expect(findChangedMock).toBeCalledWith(remoteDataArr, synchronizedDataArr);
    });

    it("should stop the procedure if receive null from remote storage", () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(null);
        synchronizeMock.mockReturnValue(synchronizedDataArr);

        storageManager.synchronize();

        expect.assertions(6);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).not.toBeCalled();
        expect(synchronizeMock).not.toBeCalled();
        expect(lsSetMock).not.toBeCalled();
        expect(rsAddMock).not.toBeCalled();
        expect(rsUpdateMock).not.toBeCalled();
    });

    it("should stop the procedure if receive a number from remote storage", () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(1);
        synchronizeMock.mockReturnValue(synchronizedDataArr);

        storageManager.synchronize();

        expect.assertions(6);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).not.toBeCalled();
        expect(synchronizeMock).not.toBeCalled();
        expect(lsSetMock).not.toBeCalled();
        expect(rsAddMock).not.toBeCalled();
        expect(rsUpdateMock).not.toBeCalled();
    });

    it("should stop the procedure if receive a string from remote storage", () => {
        const lsGetMock = jest.spyOn(localDB, "getData").mockReturnValue("string");
        const rsGetMock = jest.spyOn(remoteDB, "getData").mockReturnValue(1);
        const lsSetMock = jest.spyOn(localDB, "setData");
        synchronizeMock.mockReturnValue(synchronizedDataArr);

        storageManager.synchronize();

        expect.assertions(6);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).not.toBeCalled();
        expect(synchronizeMock).not.toBeCalled();
        expect(lsSetMock).not.toBeCalled();
        expect(rsAddMock).not.toBeCalled();
        expect(rsUpdateMock).not.toBeCalled();
    });

    it("should stop the procedure if receive an object from remote storage", () => {
        const lsGetMock = jest.spyOn(localDB, "getData").mockReturnValue({});
        const rsGetMock = jest.spyOn(remoteDB, "getData").mockReturnValue(1);
        const lsSetMock = jest.spyOn(localDB, "setData");
        synchronizeMock.mockReturnValue(synchronizedDataArr);

        storageManager.synchronize();

        expect.assertions(6);
        expect(rsGetMock).toBeCalledTimes(1);
        expect(lsGetMock).not.toBeCalled();
        expect(synchronizeMock).not.toBeCalled();
        expect(lsSetMock).not.toBeCalled();
        expect(rsAddMock).not.toBeCalled();
        expect(rsUpdateMock).not.toBeCalled();
    });

    it("should send new data to remote storage", async () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(remoteDataArr);
        synchronizeMock.mockReturnValue(synchronizedDataArr);
        findChangedMock.mockReturnValue([{ id: 1 }, { id: 2 }, { tempId: 1 }]);
        rsUpdateMock.mockReturnValue(true);

        await storageManager.synchronize();
        expect.assertions(2);
        expect(rsAddMock).toBeCalledTimes(1);
        expect(rsUpdateMock).toBeCalledTimes(2);
    });

    it("should send new data to remote storage without tempId", async () => {
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValue(remoteDataArr);
        synchronizeMock.mockReturnValue(synchronizedDataArr);
        findChangedMock.mockReturnValue([{ id: 1 }, { id: 2, tempId: 1 }, { tempId: 2 }]);
        rsUpdateMock.mockReturnValue(true);

        await storageManager.synchronize();
        expect.assertions(4);
        expect(rsAddMock).toBeCalledTimes(1);
        expect(rsAddMock).toBeCalledWith({});
        expect(rsUpdateMock).toBeCalledTimes(2);
        expect(rsUpdateMock).toBeCalledWith({ id: 2 });
    });

    it("should set new data with tempIds on local storage if rejected", async () => {
        findChangedMock.mockReturnValue([{ tempId: 1 }]);
        lsGetMock.mockReturnValue(localDataArr);
        rsGetMock.mockReturnValueOnce([]);
        rsGetMock.mockReturnValue([{ id: 1 }]);
        synchronizeMock.mockReturnValue([{ tempId: 1 }, { id: 1 }]);
        findChangedMock.mockReturnValue([{ tempId: 1 }]);
        rsAddMock.mockReturnValue(false);

        await storageManager.synchronize();
        expect.assertions(2);
        expect(lsSetMock).toBeCalledTimes(1);
        expect(lsSetMock).toBeCalledWith([{ tempId: 1 }, { id: 1 }]);
    });

    it("should set new data with ids on local storage if resolved", async () => {
        rsGetMock.mockReturnValue([]);
        synchronizeMock.mockReturnValue([{ tempId: 1 }, { id: 1 }]);
        findChangedMock.mockReturnValue([{ tempId: 1 }]);
        rsAddMock.mockReturnValue("storageId");

        await storageManager.synchronize();
        expect.assertions(2);
        expect(lsSetMock).toBeCalledTimes(1);
        expect(lsSetMock).toBeCalledWith([{ id: "storageId" }, { id: 1 }]);
    });

    it("should return true if resolved", async () => {
        rsGetMock.mockReturnValue([{}]);
        synchronizeMock.mockReturnValue([{ tempId: 1 }]);
        findChangedMock.mockReturnValue([{ tempId: 1 }]);
        rsAddMock.mockReturnValue({ id: 1 });
        rsUpdateMock.mockReturnValue(true);

        const result = await storageManager.synchronize();
        expect.assertions(1);
        expect(result).toBeTruthy();
    });

    it("should return false if rejected", async () => {
        rsAddMock.mockReturnValue(false);
        rsUpdateMock.mockReturnValue(false);

        const result = await storageManager.synchronize();
        expect.assertions(1);
        expect(result).toBeFalsy();
    });

    it("should emit an event if resolved", async () => {
        rsGetMock.mockReturnValue([{}]);
        findChangedMock.mockReturnValue([]);
        rsAddMock.mockReturnValue(true);

        rsUpdateMock.mockReturnValue(true);
        const emitMock = jest.spyOn(eventsManager, "emit");

        const result = await storageManager.synchronize();
        expect.assertions(2);
        expect(result).toBeTruthy();
        expect(emitMock).toBeCalledWith("remote connection success");
    });

    it("should emit an event if rejected", async () => {
        findChangedMock.mockReturnValue([{}]);
        rsGetMock.mockReturnValue([{}]);
        rsAddMock.mockReturnValue(false);

        rsUpdateMock.mockReturnValue(false);
        const emitMock = jest.spyOn(eventsManager, "emit");

        const result = await storageManager.synchronize();
        expect.assertions(2);
        expect(result).toBeFalsy();
        expect(emitMock).toBeCalledWith("remote connection fail");
    });

    it("should call resetId if resolved", async () => {
        rsGetMock.mockReturnValue([{}]);
        findChangedMock.mockReturnValue([]);
        rsUpdateMock.mockReturnValue(true);
        const resetMock = jest.spyOn(localDB, "resetId");

        await storageManager.synchronize();
        expect.assertions(1);
        expect(resetMock).toBeCalledTimes(1);
    });
});