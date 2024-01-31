import supertest from "supertest";
import {
    authorize,
    createIfNew,
    withSpid,
} from "../controllers/auth.controller";

describe("test auth.contoller", () => {
    test("authorize", () => {
        const func = authorize("SysAdmin");
        expect(typeof func).toBe("function");
    });
});
