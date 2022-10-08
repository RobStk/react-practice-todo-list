import TimeService from "../time-service";

const timeService = new TimeService();

describe("Interface", () => {
    it("should be implemented", () => {
        const getDateAndTimeStringIsImplemented = (timeService.getDateAndTimeString !== undefined);

        expect(getDateAndTimeStringIsImplemented).toBeTruthy();
    });
});

describe("getDateAndTimeString", () => {
    it("should return a string", () => {
        const result = timeService.getDateAndTimeString();
        expect.assertions(1);
        const resultIsString = typeof result === "string";
        expect(resultIsString).toBeTruthy();
    });
});