import RemoteSource from "../remote-source";
import RemoteStorageBroker from "../storage-broker-remote";

describe("RemoteStorageBroker getData method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should return a data array", () => {
        const remoteSource = new RemoteSource();
        const getDataMock = jest.spyOn(remoteSource, 'get').mockReturnValue({ data: ["test data 1", "test data 2"], error: null });
        const remoteStorageBroker = new RemoteStorageBroker(remoteSource);
        const response = remoteStorageBroker.getData();
        const isArray = Array.isArray(response);
        expect.assertions(3);
        expect(getDataMock).toBeCalled();
        expect(isArray).toBeTruthy();
        expect(response[1]).toBe("test data 2");
    });

    it("should return null if receives no data", () => {
        const remoteSource = new RemoteSource();
        const getDataMock = jest.spyOn(remoteSource, 'get').mockReturnValue(null);
        const remoteStorageBroker = new RemoteStorageBroker(remoteSource);
        const response = remoteStorageBroker.getData();
        const isArray = Array.isArray(response);
        expect.assertions(3);
        expect(getDataMock).toBeCalled();
        expect(isArray).toBeFalsy();
        expect(response).toBe(null);
    });
});

describe("RemoteStorageBroker setData method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it("should call post method on remoteSource with correct args", () => {
        const remoteSource = new RemoteSource();
        const postDataMock = jest.spyOn(remoteSource, 'post');
        const remoteStorageBroker = new RemoteStorageBroker(remoteSource);
        remoteStorageBroker.setData("test arg");
        expect.assertions(1);
        expect(postDataMock).toBeCalledWith("test arg");
    });

    it("should return false if receives false", () => {
        const remoteSource = new RemoteSource();
        const postDataMock = jest.spyOn(remoteSource, 'post').mockReturnValue(false);
        const remoteStorageBroker = new RemoteStorageBroker(remoteSource);
        const response = remoteStorageBroker.setData("test arg");
        expect.assertions(3);
        expect(postDataMock).toBeCalledWith("test arg");
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
    });

    it("should return true if receives true", () => {
        const remoteSource = new RemoteSource();
        const postDataMock = jest.spyOn(remoteSource, 'post').mockReturnValue(true);
        const remoteStorageBroker = new RemoteStorageBroker(remoteSource);
        const response = remoteStorageBroker.setData("test arg");
        expect.assertions(3);
        expect(postDataMock).toBeCalledWith("test arg");
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
    });
});