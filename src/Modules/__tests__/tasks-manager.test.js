import StorageManager from "../storage-manager";
import TasksManager from "../tasks-manager";

describe("Interface", () => {
    it("should be implemented", () => {
        const tasksManager = new TasksManager();
        const getTasksIsImplemented = (tasksManager.getTasks !== undefined);
        const addTaskIsImplemented = (tasksManager.addTask !== undefined);
        const updateTaskIsImplemented = (tasksManager.updateTask !== undefined);

        expect(getTasksIsImplemented).toBeTruthy();
        expect(addTaskIsImplemented).toBeTruthy();
        expect(updateTaskIsImplemented).toBeTruthy();
    });
});

describe("getTasks method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should return an array from StorageManager", () => {
        const expectedArray = [{ content: "test1" }, { content: "test2" }];
        const storageManagerGetDataMethod = jest
            .spyOn(StorageManager.prototype, "getData", "get")
            .mockImplementation(() => function () { return expectedArray });

        const storageManager = new StorageManager();
        const tasksManager = new TasksManager(storageManager);

        const returnedValue = tasksManager.getTasks();
        const returnedValueIsArray = Array.isArray(returnedValue);

        expect.assertions(4);
        expect(storageManagerGetDataMethod).toBeCalledTimes(1);
        expect(returnedValueIsArray).toBeTruthy();
        expect(returnedValue.length).toBe(2);
        expect(returnedValue[1]).toMatchObject(expectedArray[1]);
    });

    it("should return an array from StorageManager when received null", () => {
        const storageManagerGetDataMethod = jest
            .spyOn(StorageManager.prototype, "getData", "get")
            .mockImplementation(() => function () { return null });

        const storageManager = new StorageManager();
        const tasksManager = new TasksManager(storageManager);

        const returnedValue = tasksManager.getTasks();
        const returnedValueIsArray = Array.isArray(returnedValue);

        expect.assertions(3);
        expect(storageManagerGetDataMethod).toBeCalledTimes(1);
        expect(returnedValueIsArray).toBeTruthy();
        expect(returnedValue.length).toBe(0);
    });

});

describe("addTask method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call addItem method on StorageManager", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "addItem", { value: jest.fn() });
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = { content: "test argument" };

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledWith(testArgument);
    });

    it("should not call addItem method on StorageManager if argument is a string", () => {
        const storageManager = new StorageManager();
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = "test argument";

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is array", () => {
        const storageManager = new StorageManager();
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = ["test argument"];

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is number", () => {
        const storageManager = new StorageManager();
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = 1;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is null", () => {
        const storageManager = new StorageManager();
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = null;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is undefined", () => {
        const storageManager = new StorageManager();
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = undefined;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is empty object", () => {
        const storageManager = new StorageManager();
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = {};

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

});

describe("updateTask method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call replaceItem method on StorageManager", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "replaceItem", { value: jest.fn() });
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToUpdate = { content: "test content" };

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).toBeCalledWith(taskToUpdate);
    });

    it("should not call replaceItem method on StorageManager if argument is a string", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "replaceItem", { value: jest.fn() });
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToUpdate = "test content";

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is array", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "replaceItem", { value: jest.fn() });
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToUpdate = ["test content"];

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is number", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "replaceItem", { value: jest.fn() });
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToUpdate = 1;

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is null", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "replaceItem", { value: jest.fn() });
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToUpdate = null;

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is undefined", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "replaceItem", { value: jest.fn() });
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToUpdate = undefined;

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is empty object", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "replaceItem", { value: jest.fn() });
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToUpdate = {};

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled()
    });

});

describe("deleteTask method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call deleteItem on Storage Manager", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "deleteItem", { value: jest.fn() });
        const testedFunction = jest.spyOn(storageManager, "deleteItem");
        const tasksManager = new TasksManager(storageManager);

        const taskToDelete = { content: "deletedTaskContent" };
        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).toBeCalledWith(taskToDelete);
    });

    it("should not call deleteItem method on Storage Manager if argument is a string", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "deleteItem", { value: jest.fn() });
        const testedFunction = jest.spyOn(storageManager, "deleteItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToDelete = "test content";

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is array", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "deleteItem", { value: jest.fn() });
        const testedFunction = jest.spyOn(storageManager, "deleteItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToDelete = ["test content"];

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is number", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "deleteItem", { value: jest.fn() });
        const testedFunction = jest.spyOn(storageManager, "deleteItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToDelete = 1;

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is null", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "deleteItem", { value: jest.fn() });
        const testedFunction = jest.spyOn(storageManager, "deleteItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToDelete = null;

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is undefined", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "deleteItem", { value: jest.fn() });
        const testedFunction = jest.spyOn(storageManager, "deleteItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToDelete = undefined;

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is empty object", () => {
        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "deleteItem", { value: jest.fn() });
        const testedFunction = jest.spyOn(storageManager, "deleteItem");
        const tasksManager = new TasksManager(storageManager);
        const taskToDelete = {};

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled()
    });
})