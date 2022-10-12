import EventsService from "../events-service";

describe("interface", () => {
    it("should be implemented", () => {
        const eventsService = new EventsService();
        const subscribeIsImplemented = eventsService.subscribe !== undefined;
        const emitIsImplemented = eventsService.emit !== undefined;
        expect.assertions(2);
        expect(subscribeIsImplemented).toBeTruthy();
        expect(emitIsImplemented).toBeTruthy();
    });
});

describe("subscribe", () => {
    it("should emit subscribed functions", () => {
        const testObj1 = { passed: false };
        const testObj2 = { passed: false };
        const eventsService = new EventsService();
        function fn(obj) { obj.passed = true };
        eventsService.subscribe("test event 1", fn);
        eventsService.subscribe("test event 2", fn);
        eventsService.emit("test event 1", testObj1);
        eventsService.emit("test event 2", testObj2);
        expect.assertions(2);
        expect(testObj1.passed).toBeTruthy();
        expect(testObj2.passed).toBeTruthy();
    });
});