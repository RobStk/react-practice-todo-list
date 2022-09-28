import StorageBrokerLocal from "../storage-broker-local";
import StorageBrokerRemote from "../storage-broker-remote";
import TasksArraySynchronizer from "../tasks-arrays-synchronizer";
import TasksManager from "../tasks-manager";

describe("getTasks method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const localStorageBroker = new StorageBrokerLocal();
    const tasksManager = new TasksManager(localStorageBroker);

    it("should call getData method on localStorageBroker", () => {
        const testFn = jest.spyOn(localStorageBroker, "getData");
        tasksManager.getTasks();
        expect(testFn).toHaveBeenCalledTimes(1);
    });

    it("should return an empty array if it does not receive any items", () => {
        const getTaskMock = jest
            .spyOn(localStorageBroker, "getData")
            .mockImplementation(() => []);

        const tasks = tasksManager.getTasks();
        expect(getTaskMock).toHaveBeenCalledTimes(1);
        expect(tasks.length).toBe(0);
    });

    it("should return array of items", () => {
        const getTaskMock = jest
            .spyOn(localStorageBroker, "getData")
            .mockImplementation(() => ["items1", "items2", "items3"]);

        const tasks = tasksManager.getTasks();
        expect(getTaskMock).toHaveBeenCalledTimes(1);
        expect(tasks.length).toBe(3);
    });

});

describe("setTasks method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const localStorageBroker = new StorageBrokerLocal();
    const remoteStorageBroker = new StorageBrokerRemote();
    const tasksManager = new TasksManager(localStorageBroker, remoteStorageBroker);

    it("should call setTasks method with correct params on localStorageBroker", () => {
        const params = "testParams";
        const testFn = jest.spyOn(localStorageBroker, "setData");

        tasksManager.setTasks(params);
        expect(testFn).toHaveBeenCalledTimes(1);
        expect(testFn).toHaveBeenCalledWith(params);
    });

});

describe("addTask method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const localStorageBroker = new StorageBrokerLocal();
    const remoteStorageBroker = new StorageBrokerRemote();
    const tasksManager = new TasksManager(localStorageBroker, remoteStorageBroker);

    it("should call setData method with correct params on localStorageBroker", () => {
        const baseLocalData = ["item1", "item2"];
        const newTask = "newTask";
        const expectedValue = [...baseLocalData];
        expectedValue.push(newTask);

        const lsGetDataMethod = jest.spyOn(localStorageBroker, "getData").mockReturnValue(baseLocalData);

        const lsSetDataMethod = jest.spyOn(localStorageBroker, "setData");

        expect.assertions(3);
        tasksManager.addTask(newTask);
        expect(lsGetDataMethod).toHaveBeenCalledTimes(1);
        expect(lsSetDataMethod).toHaveBeenCalledTimes(1);
        expect(lsSetDataMethod).toHaveBeenCalledWith(expectedValue);
    });

});

describe("updateTask method", () => {

    it("TODO", () => {
        //TODO
    });

});

describe("synchronize method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const localStorageBroker = new StorageBrokerLocal();
    const remoteStorageBroker = new StorageBrokerRemote();
    const tasksArraysSynchronizer = new TasksArraySynchronizer();
    const tasksManager = new TasksManager(localStorageBroker, remoteStorageBroker, tasksArraysSynchronizer);

    it("should distribute synchronized tasks", () => {
        const localTasks = ["localTask"];
        const remoteTasks = ["remoteTask"];
        const lsGetMethod = jest.spyOn(localStorageBroker, "getData").mockReturnValue(localTasks);
        const rsGetMethod = jest.spyOn(remoteStorageBroker, "getData").mockReturnValue(remoteTasks);
        const lsSetMethod = jest.spyOn(localStorageBroker, "setData");
        const rsSetMethod = jest.spyOn(remoteStorageBroker, "setData").mockImplementation();

        const synchronizedTasks = [...localTasks, ...remoteTasks];

        const synchronizeMethod = jest.spyOn(tasksArraysSynchronizer, "synchronize").mockReturnValue(synchronizedTasks);


        tasksManager.synchronize();

        expect.assertions(8);
        expect(rsGetMethod).toBeCalledTimes(1);
        expect(lsGetMethod).toBeCalledTimes(1);
        expect(synchronizeMethod).toBeCalledTimes(1);
        expect(synchronizeMethod).toBeCalledWith(localTasks, remoteTasks);
        expect(lsSetMethod).toBeCalledTimes(1);
        expect(rsSetMethod).toBeCalledTimes(1);
        expect(lsSetMethod).toBeCalledWith(synchronizedTasks);
        expect(rsSetMethod).toBeCalledWith(synchronizedTasks);
    })

    it("should not distribute synchronized tasks if not received tasks array from remote storage", () => {

    })
})