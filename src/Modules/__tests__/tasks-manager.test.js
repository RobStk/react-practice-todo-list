import StorageManager from "../storage-manager";
import TasksManager from "../tasks-manager";

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
        Object.defineProperty(storageManager, "getData", { value: jest.fn() });
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = { content: "test argument" };

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledWith(testArgument);
    });

    it("should not call addItem method on StorageManager if argument is a string", () => {

        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "getData", { value: jest.fn() });
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = "test argument";

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is array", () => {

        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "getData", { value: jest.fn() });
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = ["test argument"];

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is number", () => {

        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "getData", { value: jest.fn() });
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = 1;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is null", () => {

        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "getData", { value: jest.fn() });
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = null;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is undefined", () => {

        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "getData", { value: jest.fn() });
        const storageManagerAddItemMethod = jest.spyOn(storageManager, "addItem");
        const tasksManager = new TasksManager(storageManager);
        const testArgument = undefined;

        tasksManager.addTask(testArgument);

        expect.assertions(1);
        expect(storageManagerAddItemMethod).toBeCalledTimes(0);
    });

    it("should not call addItem method on StorageManager if argument is empty object", () => {

        const storageManager = new StorageManager();
        Object.defineProperty(storageManager, "getData", { value: jest.fn() });
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

    it("should 3", () => {
        //TODO
    });

});
