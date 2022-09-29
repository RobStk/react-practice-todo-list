import ArraySynchronizer from "../arrays-synchronizer";
import LocalStorageService from "../local-storage-service";
import RemoteStorageService from "../remote-storage-service";
import StorageManager from "../storage-manager";

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

    it("should stop the procedure if receive number from remote storage", () => {
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

    it("should stop the procedure if receive string from remote storage", () => {
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

    it("should stop the procedure if receive object from remote storage", () => {
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