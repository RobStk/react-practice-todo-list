import ClientTimeService from "../client-time-service";

const timeService = new ClientTimeService();
const getFullYearMock = jest.spyOn(Date.prototype, "getFullYear");
const getMonthMock = jest.spyOn(Date.prototype, "getMonth");
const getDateMock = jest.spyOn(Date.prototype, "getDate");
const getHoursMock = jest.spyOn(Date.prototype, "getHours");
const getMinutesMock = jest.spyOn(Date.prototype, "getMinutes");
const getSecondsMock = jest.spyOn(Date.prototype, "getSeconds");
const getMillisecondsMock = jest.spyOn(Date.prototype, "getMilliseconds");

describe("getFullTimeRaw", () => {
    it("should return a formatted string", () => {
        getFullYearMock.mockReturnValue(2022);
        getMonthMock.mockReturnValue(1);
        getDateMock.mockReturnValue(2);
        getHoursMock.mockReturnValue(6);
        getMinutesMock.mockReturnValue(3);
        getSecondsMock.mockReturnValue(8);
        getMillisecondsMock.mockReturnValue(5);
        const result = timeService.getFullTimeRaw();

        getMonthMock.mockReturnValue(11);
        getDateMock.mockReturnValue(12);
        getHoursMock.mockReturnValue(16);
        getMinutesMock.mockReturnValue(13);
        getSecondsMock.mockReturnValue(18);
        getMillisecondsMock.mockReturnValue(115);
        const result2 = timeService.getFullTimeRaw();

        expect.assertions(2);
        expect(result).toBe("20220202060308005");
        expect(result2).toBe("20221212161318115");
    });
});

describe("getDateRaw", () => {
    it("should return a formatted string", () => {
        getFullYearMock.mockReturnValue(2022);
        getMonthMock.mockReturnValue(1);
        getDateMock.mockReturnValue(2);
        const result = timeService.getDateRaw();

        getFullYearMock.mockReturnValue(2022);
        getMonthMock.mockReturnValue(11);
        getDateMock.mockReturnValue(12);
        const result2 = timeService.getDateRaw();

        expect.assertions(2);
        expect(result).toBe("20220202");
        expect(result2).toBe("20221212");
    });
});

describe("getDateDashed", () => {
    it("should return a string", () => {
        getFullYearMock.mockReturnValue(2022);
        getMonthMock.mockReturnValue(1);
        getDateMock.mockReturnValue(2);
        const result = timeService.getDateDashed();

        getFullYearMock.mockReturnValue(2022);
        getMonthMock.mockReturnValue(11);
        getDateMock.mockReturnValue(12);
        const result2 = timeService.getDateDashed();

        expect.assertions(2);
        expect(result).toBe("2022-02-02");
        expect(result2).toBe("2022-12-12");
    });
});

describe("getTimeRaw", () => {
    it("should return a string", () => {
        getHoursMock.mockReturnValue(6);
        getMinutesMock.mockReturnValue(3);
        getSecondsMock.mockReturnValue(8);
        getMillisecondsMock.mockReturnValue(5);
        const result = timeService.getTimeRaw();

        getHoursMock.mockReturnValue(16);
        getMinutesMock.mockReturnValue(13);
        getSecondsMock.mockReturnValue(18);
        getMillisecondsMock.mockReturnValue(115);
        const result2 = timeService.getTimeRaw();

        expect.assertions(2);
        expect(result).toBe("060308005");
        expect(result2).toBe("161318115");
    });
});

describe("getTimeWithColons", () => {
    it("should return a string", () => {
        getHoursMock.mockReturnValue(6);
        getMinutesMock.mockReturnValue(3);
        getSecondsMock.mockReturnValue(8);
        const result = timeService.getTimeWithColons();

        getHoursMock.mockReturnValue(16);
        getMinutesMock.mockReturnValue(13);
        getSecondsMock.mockReturnValue(18);
        getMillisecondsMock.mockReturnValue(115);
        const result2 = timeService.getTimeWithColons();

        expect.assertions(2);
        expect(result).toBe("06:03:08");
        expect(result2).toBe("16:13:18");
    });
});