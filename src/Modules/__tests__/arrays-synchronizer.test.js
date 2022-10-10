import ArraySynchronizer from "../arrays-synchronizer";

const arraySynchronizer = new ArraySynchronizer();

describe("Interface", () => {
    it("should be implemented", () => {
        const synchronizeIsImplemented = (arraySynchronizer.synchronize !== undefined);
        const findChangedIsImplemented = (arraySynchronizer.findChanged !== undefined);
        expect.assertions(2);
        expect(synchronizeIsImplemented).toBeTruthy();
        expect(findChangedIsImplemented).toBeTruthy();
    });
});

describe("synchronize method", () => {
    const array1 = [
        { id: 1, content: "content1", lastUpdate: "20221005053015" },
        { id: 2, content: "content2", lastUpdate: "20221004063020" },
        { id: 3, content: "content3 updated", lastUpdate: "20221006053015" },
        { id: 4, content: "content4", lastUpdate: "20221003204023" },
        { id: 5, content: "content5", lastUpdate: "20220906053015" },
        { content: "new content1-6", lastUpdate: "20221006053130", tempId: 1 },
        { content: "new content1-7", lastUpdate: "20221006053100", tempId: 2 }
    ];
    const array2 = [
        { id: 1, content: "content1", lastUpdate: "20221005053015" },
        { id: 2, content: "content2", lastUpdate: "20221004063020" },
        { id: 3, content: "content3", lastUpdate: "20221003052045" },
        { id: 4, content: "content4 updated", lastUpdate: "20221006053218" },
        { id: 5, content: "content5", lastUpdate: "20220906053015" },
        { id: 6, content: "content7", lastUpdate: "20221006052033" },
        { id: 7, content: "content8", lastUpdate: "20221006051952" }
    ];

    const array3 = [
        { id: 4, content: "content4 updated", lastUpdate: "20221006053218" },
        { content: "new content1-6", lastUpdate: "20221006053130", tempId: 1 },
        { content: "new content1-7", lastUpdate: "20221006053100", tempId: 2 },
        { id: 3, content: "content3 updated", lastUpdate: "20221006053015" },
        { id: 6, content: "content7", lastUpdate: "20221006052033" },
        { id: 7, content: "content8", lastUpdate: "20221006051952" },
        { id: 1, content: "content1", lastUpdate: "20221005053015" },
        { id: 2, content: "content2", lastUpdate: "20221004063020" },
        { id: 5, content: "content5", lastUpdate: "20220906053015" },
    ];
    ;
    it("should return one array of two", () => {
        const synchronizedArray = arraySynchronizer.synchronize(array1, array2);
        expect.assertions(3);
        const isArray = Array.isArray(synchronizedArray);
        expect(isArray).toBeTruthy();
        expect(synchronizedArray).toHaveLength(9);
        expect(synchronizedArray).toStrictEqual(array3);
    });
});

describe("findChanged method", () => {
    const baseArray = [
        { id: 1, content: "content1", lastUpdate: "20221005053015" },
        { id: 2, content: "content2", lastUpdate: "20221004063020" },
        { id: 3, content: "content3", lastUpdate: "20221006053015" },
    ];
    const comparedArray = [
        { id: 1, content: "content1", lastUpdate: "20221005053015" },
        { id: 2, content: "content2 updated", lastUpdate: "20221004063030" },
        { id: 3, content: "content3", lastUpdate: "20221006053015" },
        { content: "content4", lastUpdate: "20221006053130", tempId: 1 },
        { content: "content5", lastUpdate: "20221006053100", tempId: 2 },
    ];

    const expectedArray = [
        { id: 2, content: "content2 updated", lastUpdate: "20221004063030" },
        { content: "content4", lastUpdate: "20221006053130", tempId: 1 },
        { content: "content5", lastUpdate: "20221006053100", tempId: 2 },
    ];

    it("should return one filtered array", () => {
        const filteredArray = arraySynchronizer.findChanged(baseArray, comparedArray);
        expect.assertions(3);
        const isArray = Array.isArray(filteredArray);
        expect(isArray).toBeTruthy();
        expect(filteredArray).toHaveLength(3);
        expect(filteredArray).toStrictEqual(expectedArray);
    });
});