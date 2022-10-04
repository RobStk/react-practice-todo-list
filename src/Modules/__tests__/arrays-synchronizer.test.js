import ArraySynchronizer from "../arrays-synchronizer";

const arraySynchronizer = new ArraySynchronizer();

describe("Interface", () => {
    it("should be implemented", () => {
        const synchronizeIsImplemented = (arraySynchronizer.synchronize !== undefined);

        expect.assertions(1);
        expect(synchronizeIsImplemented).toBeTruthy();
    })
})