import TasksManager from "../tasks-manager";
import LocalStorageBroker from "../storage-broker-local";

describe("TasksManager.getTasks method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call getTasks method on localStorageBroker", () => {
        const tasksManager = new TasksManager();
        const getTaskMock = jest.spyOn(LocalStorageBroker.prototype, 'getTasks');
        tasksManager.getTasks();
        expect(getTaskMock).toHaveBeenCalledTimes(1);
    });

    it("should return an empty array if it does not receive any items", () => {
        const getTaskMock = jest
            .spyOn(LocalStorageBroker.prototype, 'getTasks')
            .mockImplementation(() => []);

        const tasksManager = new TasksManager();
        const tasks = tasksManager.getTasks();
        expect(getTaskMock).toHaveBeenCalledTimes(1);
        expect(tasks.length).toBe(0);
    });

    it("should return array of items", () => {
        const getTaskMock = jest
            .spyOn(LocalStorageBroker.prototype, 'getTasks')
            .mockImplementation(() => ["items1", "items2", "items3"]);

        const tasksManager = new TasksManager();
        const tasks = tasksManager.getTasks();
        expect(getTaskMock).toHaveBeenCalledTimes(1);
        expect(tasks.length).toBe(3);
    });

});

describe("TasksManager.setTasks method", () => {

    it("should call setTasks method with correct params on LocalStorageBroker", () => {
        const params = "testParams";
        const getTaskMock = jest
            .spyOn(LocalStorageBroker.prototype, 'setTasks');

        const tasksManager = new TasksManager();
        tasksManager.setTasks(params);
        expect(getTaskMock).toHaveBeenCalledTimes(1);
        expect(getTaskMock).toHaveBeenCalledWith(params);
    });

});