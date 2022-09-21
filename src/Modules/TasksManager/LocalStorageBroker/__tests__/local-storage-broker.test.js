import LocalStorageBroker from "../local-storage-broker";

describe("LocalStorageBroker getTasks method", () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    // afterEach(() => { localStorage.removeItem("test") });

    it("should call getItem on localStorage", () => {
        // localStorage.setItem("test", null);
        const getItemMock = jest.spyOn(Storage.prototype, 'getItem');
        const localStorageBroker = new LocalStorageBroker();
        localStorageBroker.getTasks();
        expect(getItemMock).toBeCalledTimes(1);
    });

    it("should return an empty array when receives null", () => {
        const getItemMock = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
        const localStorageBroker = new LocalStorageBroker();
        const tasks = localStorageBroker.getTasks();
        expect(getItemMock).toBeCalledTimes(1);
        const isArray = Array.isArray(tasks);
        expect(isArray).toBeTruthy();
    });

    it("should return an empty array when receives undefined", () => {
        const getItemMock = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(undefined);
        const localStorageBroker = new LocalStorageBroker();
        const tasks = localStorageBroker.getTasks();
        expect(getItemMock).toBeCalledTimes(1);
        const isArray = Array.isArray(tasks);
        expect(isArray).toBeTruthy();
    });
})