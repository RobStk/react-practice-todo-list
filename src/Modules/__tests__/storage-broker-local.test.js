import LocalStorageBroker from "../storage-broker-local";

describe("LocalStorageBroker getTasks method", () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    it("should return an empty array when it gets no values", () => {
        let tasks = null;
        let isArray = undefined;
        const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
        const localStorageBroker = new LocalStorageBroker();

        getItemMock.mockReturnValue(null);
        tasks = localStorageBroker.getTasks();
        expect(getItemMock).toBeCalledTimes(1);
        isArray = Array.isArray(tasks);
        expect(isArray).toBeTruthy();

        getItemMock.mockReturnValue(undefined);
        tasks = localStorageBroker.getTasks();
        expect(getItemMock).toBeCalledTimes(2);
        isArray = Array.isArray(tasks);
        expect(isArray).toBeTruthy();

        getItemMock.mockReturnValue("");
        tasks = localStorageBroker.getTasks();
        expect(getItemMock).toBeCalledTimes(3);
        isArray = Array.isArray(tasks);
        expect(isArray).toBeTruthy();
    });

    it("should return array of objects when it gets string", () => {
        const tasksObj = [
            {
                "content": "Item 1 content"
            },
            {
                "content": "Item 2 content"
            }
        ];
        const tasksString = JSON.stringify(tasksObj);
        const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
        const localStorageBroker = new LocalStorageBroker();

        getItemMock.mockReturnValue(tasksString);
        const tasks = localStorageBroker.getTasks();
        expect(getItemMock).toBeCalledTimes(1);
        const isArray = Array.isArray(tasks);
        expect(isArray).toBeTruthy();
        expect(tasks).toHaveLength(2);
        expect(tasks[1].content).toBe("Item 2 content");
    });
});

describe("LocalStorageBroker settTasks method", () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    it("should call setItem with correct arguments on localeStorage", () => {
        const tasksObj = [
            {
                "content": "Item 1 content"
            },
            {
                "content": "Item 2 content"
            }
        ];
        const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
        const localStorageBroker = new LocalStorageBroker();

        localStorageBroker.setTasks(tasksObj);
        expect(setItemMock).toBeCalledTimes(1);
        const tasksStr = JSON.stringify(tasksObj);
        expect(setItemMock).toBeCalledWith("tasks", tasksStr);
    });
});