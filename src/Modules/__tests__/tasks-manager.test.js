import StorageBrokerLocal from "../storage-broker-local";
import StorageBrokerRemote from "../storage-broker-remote";
import TasksManager from "../tasks-manager";

describe("TasksManager.getTasks method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    const localStorageBroker = new StorageBrokerLocal();
    const remoteStorageBroker = new StorageBrokerRemote();
    const tasksManager = new TasksManager(localStorageBroker, remoteStorageBroker);

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

describe("TasksManager.setTasks method", () => {
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

describe("TasksManager.synchronize method", () => {

    it("TODO", () => {
        //TODO
    });

});