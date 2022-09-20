import TasksManager from "../tasks-manager";
import TasksLocalProvider from "../TasksLocalProvider/tasks-local-provider";

jest.mock("../TasksLocalProvider/tasks-local-provider");

describe("TasksManager.getTasks method", () => {

    it("should return an empty array if it does not receive any tasks", () => {
        TasksLocalProvider.mockImplementation(() => {
            return {
                getTasks: () => []
            }
        })
        const tasksManager = new TasksManager();
        const tasks = tasksManager.getTasks();
        expect(tasks.length).toBe(0);
    });

    it("should return array of tasks", () => {
        TasksLocalProvider.mockImplementation(() => {
            return {
                getTasks: () => ["task1", "task2", "task3"]
            }
        })
        const tasksManager = new TasksManager();
        const tasks = tasksManager.getTasks();
        expect(tasks.length).toBe(3);
    });

});