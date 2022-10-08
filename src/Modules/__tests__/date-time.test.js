import DateTime from "../date-time";

describe("getFullTimeRaw", () => {
    it("should return a string", () => {
        const result = DateTime.getFullTimeRaw();
        expect.assertions(1);
        const resultIsString = typeof result === "string";
        expect(resultIsString).toBeTruthy();
    });
});

describe("getDateRaw", () => {
    it("should return a string", () => {
        const result = DateTime.getDateRaw();
        expect.assertions(1);
        const resultIsString = typeof result === "string";
        expect(resultIsString).toBeTruthy();
    });
});

describe("getDateDashed", () => {
    it("should return a string", () => {
        const result = DateTime.getDateDashed();
        expect.assertions(1);
        const resultIsString = typeof result === "string";
        expect(resultIsString).toBeTruthy();
    });
});

describe("getTimeRaw", () => {
    it("should return a string", () => {
        const result = DateTime.getTimeRaw();
        expect.assertions(1);
        const resultIsString = typeof result === "string";
        expect(resultIsString).toBeTruthy();
    });
});

describe("getTimeWithColons", () => {
    it("should return a string", () => {
        const result = DateTime.getTimeWithColons();
        expect.assertions(1);
        const resultIsString = typeof result === "string";
        expect(resultIsString).toBeTruthy();
    });
});