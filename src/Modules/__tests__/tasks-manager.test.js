import StorageManager from "../storage-manager";
import TasksManager from "../tasks-manager";

const storageManager = new StorageManager();
Object.defineProperty(storageManager, "getData", { value: jest.fn() });
Object.defineProperty(storageManager, "replaceItem", { value: jest.fn() });
Object.defineProperty(storageManager, "deleteItem", { value: jest.fn() });
Object.defineProperty(storageManager, "addItem", { value: jest.fn() });
Object.defineProperty(storageManager, "synchronize", { value: jest.fn() });

const tasksManager = new TasksManager(storageManager);

describe("Interface", () => {
    it("should be implemented", () => {
        const getTasksIsImplemented = (tasksManager.getTasks !== undefined);
        const addTaskIsImplemented = (tasksManager.addTask !== undefined);
        const updateTaskIsImplemented = (tasksManager.updateTask !== undefined);

        expect(getTasksIsImplemented).toBeTruthy();
        expect(addTaskIsImplemented).toBeTruthy();
        expect(updateTaskIsImplemented).toBeTruthy();
    });
});

describe("getTasks method", () => {
    const storageManagerGetDataMethod = jest.spyOn(storageManager, "getData");

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should return an array from StorageManager", () => {
        const expectedArray = [{ content: "test1" }, { content: "test2" }];
        storageManagerGetDataMethod.mockReturnValue(expectedArray);

        const returnedValue = tasksManager.getTasks();
        const returnedValueIsArray = Array.isArray(returnedValue);

        expect.assertions(4);
        expect(storageManagerGetDataMethod).toBeCalledTimes(1);
        expect(returnedValueIsArray).toBeTruthy();
        expect(returnedValue.length).toBe(2);
        expect(returnedValue[1]).toMatchObject(expectedArray[1]);
    });

    it("should return an array from StorageManager when received null", () => {
        storageManagerGetDataMethod.mockReturnValue(null);

        const returnedValue = tasksManager.getTasks();
        const returnedValueIsArray = Array.isArray(returnedValue);

        expect.assertions(3);
        expect(storageManagerGetDataMethod).toBeCalledTimes(1);
        expect(returnedValueIsArray).toBeTruthy();
        expect(returnedValue.length).toBe(0);
    });

    it("should not return deleted tasks", () => {
        const storageData = [
            { content: "item1", deleted: false },
            { content: "item2", deleted: true },
            { content: "item3", deleted: false }
        ];

        storageManagerGetDataMethod.mockReturnValue(storageData);

        const data = tasksManager.getTasks();
        expect(storageManagerGetDataMethod).toHaveBeenCalledTimes(1);
        expect(data.length).toBe(2);
        expect(data[1].content).toBe("item3");
    });
});

describe("addTask method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call addItem method on StorageManager", () => {

        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");

        const testArgument = { content: "test argument" };

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledWith(testArgument);
    });

    it("should not call addItem method on StorageManager if argument is a string", () => {
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");

        const testArgument = "test argument";

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is array", () => {
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");

        const testArgument = ["test argument"];

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is number", () => {
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");

        const testArgument = 1;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is null", () => {
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");

        const testArgument = null;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is undefined", () => {
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");

        const testArgument = undefined;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is empty object", () => {
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");

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
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");

        const taskToUpdate = { content: "test content" };

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).toBeCalledWith(taskToUpdate);
    });

    it("should not call replaceItem method on StorageManager if argument is a string", () => {
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");

        const taskToUpdate = "test content";

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is array", () => {
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");

        const taskToUpdate = ["test content"];

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is number", () => {
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");

        const taskToUpdate = 1;

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is null", () => {
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");

        const taskToUpdate = null;

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is undefined", () => {
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");

        const taskToUpdate = undefined;

        tasksManager.updateTask(taskToUpdate);

        expect.assertions(1);
        expect(storageManagerReplaceItemMethod).not.toBeCalled();
    });

    it("should not call replaceItem method on StorageManager if argument is empty object", () => {
        const storageManagerReplaceItemMethod = jest.spyOn(storageManager, "replaceItem");

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
        const testedFunction = jest.spyOn(storageManager, "deleteItem");


        const taskToDelete = { content: "deletedTaskContent" };
        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).toBeCalledWith(taskToDelete);
    });

    it("should not call deleteItem method on Storage Manager if argument is a string", () => {
        const testedFunction = jest.spyOn(storageManager, "deleteItem");

        const taskToDelete = "test content";

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is array", () => {
        const testedFunction = jest.spyOn(storageManager, "deleteItem");

        const taskToDelete = ["test content"];

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is number", () => {
        const testedFunction = jest.spyOn(storageManager, "deleteItem");

        const taskToDelete = 1;

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is null", () => {
        const testedFunction = jest.spyOn(storageManager, "deleteItem");

        const taskToDelete = null;

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is undefined", () => {
        const testedFunction = jest.spyOn(storageManager, "deleteItem");

        const taskToDelete = undefined;

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled();
    });

    it("should not call deleteItem method on Storage Manager if argument is empty object", () => {
        const testedFunction = jest.spyOn(storageManager, "deleteItem");

        const taskToDelete = {};

        tasksManager.deleteTask(taskToDelete);

        expect.assertions(1);
        expect(testedFunction).not.toBeCalled()
    });
})