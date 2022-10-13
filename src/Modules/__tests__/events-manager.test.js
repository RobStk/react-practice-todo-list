import EventsManager from "../events-manager";

describe("interface", () => {
    it("should be implemented", () => {
        const eventsManager = new EventsManager();
        const subscribeIsImplemented = eventsManager.subscribe !== undefined;
        const emitIsImplemented = eventsManager.emit !== undefined;
        expect.assertions(2);
        expect(subscribeIsImplemented).toBeTruthy();
        expect(emitIsImplemented).toBeTruthy();
    });
});

describe("subscribe", () => {
    it("should emit subscribed functions", () => {
        const testObj1 = { passed: false };
        const testObj2 = { passed: false };
        const eventsManager = new EventsManager();
        function fn(obj) { obj.passed = true };
        eventsManager.subscribe("test event 1", fn);
        eventsManager.subscribe("test event 2", fn);
        eventsManager.emit("test event 1", testObj1);
        eventsManager.emit("test event 2", testObj2);
        expect.assertions(2);
        expect(testObj1.passed).toBeTruthy();
        expect(testObj2.passed).toBeTruthy();
    });
});