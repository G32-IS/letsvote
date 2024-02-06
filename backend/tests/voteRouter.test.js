import supertest from "supertest";
import { voteRouter } from "../routes/vote.router";
import { app } from "../utils/testServer";
// jest will automatically redirect the import to ./backend/__mocks__
import { prisma } from "../prisma/prisma-client";
import { verifyToken } from "../controllers/auth.controller";

app.use("/vote", voteRouter);

const req = supertest(app);

jest.mock("../controllers/auth.controller");

verifyToken.mockImplementation((req, res, next) => {
    // Simulating a successful token verification:
    req.body.user = mockedUser;
    next();
});

describe("Test vote.router (/vote)", () => {
    describe("POST /create", () => {
        test("Expected: 401, Event has not started yet", async () => {
            const res = await req.post("/vote/create");
            // expect(res.body.message).toEqual("test");
            // expect(res.statusCode).toBe(404);
        });

        test("Expected: 422, User has already partecipated in this event", () => {});

        test("Expected: 200, and creation of new partecipation", () => {});
    });
});
