import Connection from "../../utilities/connection";
import RemoteStorageBroker from "../storage-broker-remote";

describe("RemoteStorageBroker getTasks method", () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    it("should return a response object", async () => {
        const getTaskMock = jest.spyOn(Connection.prototype, 'get').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    data: "test data",
                    error: false
                });
            });
        });
        const dbConnectionInterface = new Connection();
        const remoteStorageBroker = new RemoteStorageBroker(dbConnectionInterface);
        const response = await remoteStorageBroker.getTasks();
        expect.assertions(3);
        expect(getTaskMock).toBeCalled();
        expect(response.data).toBe("test data");
        expect(response.error).toBeFalsy();
    });
});

describe("RemoteStorageBroker sendTasks method", () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    it("should call post method on dbConnectionInterface with correct args", async () => {
        const getTaskMock = jest.spyOn(Connection.prototype, 'post').mockImplementation((args) => {
            return new Promise((resolve, reject) => {
                resolve({
                    error: false
                });
            });
        });
        const dbConnectionInterface = new Connection();
        const remoteStorageBroker = new RemoteStorageBroker(dbConnectionInterface);
        await remoteStorageBroker.sendTasks("test arg");
        expect.assertions(1);
        expect(getTaskMock).toBeCalledWith("test arg");
    });

    it("should return a response object", async () => {
        jest.spyOn(Connection.prototype, 'post').mockImplementation((args) => {
            return new Promise((resolve, reject) => {
                resolve({
                    error: 404
                });
            });
        });
        const dbConnectionInterface = new Connection();
        const remoteStorageBroker = new RemoteStorageBroker(dbConnectionInterface);
        const response = await remoteStorageBroker.sendTasks("test arg");
        expect.assertions(3);
        expect(response.error).toBeDefined();
        expect(response.error).toBeTruthy();
        expect(response.error).toBe(404);
    });
});