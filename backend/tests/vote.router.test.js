import express from "express";
import supertest from "supertest";
import { app } from "../utils/testServer";
// jest will automatically redirect the import to ./backend/__mocks__
import { prisma } from "../prisma/prisma-client";
import { verifyToken } from "../controllers/auth.controller";
import { createVote } from "../controllers/vote.controller";
import { checkPrerequisites } from "../controllers/vote.controller";

const voteRouter = express.Router();
voteRouter.use(express.json());

voteRouter.post("/create", createVote);

app.use("/api/vote", voteRouter);

const req = supertest(app);

jest.mock("../controllers/auth.controller");

verifyToken.mockImplementation((req, res, next) => {
    // Simulating a successful token verification:
    req.body.user = mockedUser;
    next();
});

jest.mock("../prisma/prisma-client", () => ({
    prisma: {
        event: {
            findUnique: jest.fn(),
        },
        vote: {
            create: jest.fn(),
        },
        participation: {
            create: jest.fn(),
            findFirst: jest.fn(),
        },
        $transaction: jest.fn().mockImplementation(async (transactionCallback) => {
            return transactionCallback();
        }),
    },
}));

describe("Test vote.router (/vote)", () => {
    describe("POST /create", () => {
        test("Expected: 200, User was able to vote and the vote is stored", async () => {
            const mockUser = {
                id: "mockid123",
            };
            const mockedVote = {
                eventId: "mockEventId123",
                choiceId: "mockChoiceId123",
            };
            const mockedParticipation = {
                userId: mockUser.id,
                eventId: mockedVote.eventId,
            };
            prisma.vote.create.mockImplementation(async () => mockedVote);
            prisma.participation.create.mockImplementation(
                async () => mockedParticipation
            );
            const { statusCode, body } = await req
                .post("/api/vote/create")
                .send({
                    vote: mockedVote,
                    user: mockUser,
                });

            expect(statusCode).toBe(200);
            expect(body.participation).toBeDefined();
        });

        test("Expected: 200, and creation of new participation", () => {});
    });
});

// this are not tests strictly related with voteRouter, but are just for its middleware checkPrerequisites()
// describe("Test checkPrerequisites() middleware", () => {
//     test("Expected: 200, ", async () => {
//         const mockUser = {
//             id: "mockid123",
//         };
//         const mockVote = {
//             eventId: "mockeventid123",
//         };

//         const myNext = () => true;
//         let mockReq = {
//             body: {
//                 user: mockUser,
//                 vote: mockVote,
//             },
//         };

//         const mockEvent = {
//             startDate: new Date(),
//             endDate: new Date(),
//             type: "ReferendumNazionale",
//         };

//         prisma.event.findUnique.mockImplementation(async () => {
//             return mockEvent;
//         });
//         prisma.participation.findFirst.mockImplementation(async () => {
//             return null;
//         });
//         prisma.user.findUnique.mockImplementation(async () => {
//             return { pob: {} };
//         });

//         const res = await checkPrerequisites(req, res, myNext);
//     });
// });
