import supertest from "supertest";
import { voteRouter } from "../routes/vote.router";
import { app } from "../utils/testServer";

app.use("/vote", voteRouter);

const req = supertest(app);

describe("Test vote.router (/vote)", () => {
    describe("POST /create", () => {
        test("Expected: 401, Event has not started yet", () => {
        })

        test("Expected: 422, User has already partecipated in this event", () => {
        })

        test("Expected: 200, and creation of new partecipation", () => {
        })
    })
});
