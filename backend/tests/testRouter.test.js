import express from "express";
import { testRouter } from "../routes/test.router";
import supertest from "supertest";

// !!! use jest.mock() during testing to avoid affecting the database
// this is a simulation of the real object
// I'm not accessing the db, but returning a predetermined value to simulate a query
jest.mock("../prisma/prisma-client", () => ({
    prisma: {
        user: {
            // mock the count method of the User model
            count: jest
                .fn()
                // when count is called it will resolved with a specific value
                .mockResolvedValue(10),
        },
    },
}));

// if app is imported from index.ts instead of creating an instance, the tests are propagated to all files interacting with index.ts
const app = express();
app.use("/test", testRouter);

const req = supertest(app);

describe("test.router (/test)", () => {
    describe("GET /", () => {
        test("It should return a success msg", async () => {
            const res = await req.get("/test");
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ message: "Connection successful" });
        });
    });

    describe("GET /users", () => {
        test("It should return a number of users", async () => {
            const res = await req.get("/test/users");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("count");
            expect(res.body.count).toBeGreaterThan(-1); // to test
        });
        test('It should by of type "number"', async () => {
            const res = await req.get("/test/users");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("count");
            expect(typeof res.body.count).toBe("number");
        });
    });
});
