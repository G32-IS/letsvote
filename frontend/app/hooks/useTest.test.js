import { fetchTest } from "./useTest";

test("the data is peanut butter", () => {
    return fetchTest().then((data) => {
        expect(typeof data.count).toBe("number");
    });
});
