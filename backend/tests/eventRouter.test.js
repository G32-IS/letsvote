import express from "express";
import supertest from "supertest";
import { app } from "../utils/testServer";
import {
    createEvent,
    getAllEvents,
    getMyEvents,
    getEventParticipations,
    getEvent,
    getEventVotes,
    updateEvent,
    deleteEvent,
} from "../controllers/event.controller";
import { prisma } from "../prisma/prisma-client";
import { redisClient } from "../redis/redis-client";

// setup the fake/temporary router
const eventRouter = express.Router();
eventRouter.use(express.json());

eventRouter.put("/update", updateEvent);
eventRouter.delete("/delete/:id", deleteEvent);
eventRouter.get("/get/mine", getMyEvents);
eventRouter.get("/get/single/:id", getEvent);

app.use("/api/event", eventRouter);

const req = supertest(app);

const mockUser = {
    id: "65c0bea5959e924eaf699c67",
    hashedPassword:
        "$2b$10$BpqyEnABcemz8az/pLXJluPUQWjlNnRHdLnX8PKrE9lHOoohA9QPO",
    name: "Luca Verdi",
    role: "Admin",
    pob: {
        create: {
            region: "NA",
            locality: "F839",
        },
    },
};

// TODO:
/* 
    - I need to mock prisma.$transaction to test /event/create
*/

jest.mock("../prisma/prisma-client", () => ({
    prisma: {
        event: {
            update: jest.fn(),
            deleteMany: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

jest.mock("../redis/redis-client", () => ({
    redisClient: {
        json: {
            set: jest.fn(),
            get: jest.fn(),
        },
        expire: jest.fn(),
    },
}));

// jest.mock('../prisma/prisma-client', () => ({
//     prisma: {
//         user: {
//             findUnique: jest.fn(),
//         },
//     }
// }));

afterEach(() => {
    jest.clearAllMocks();
});

describe("Test event.router", () => {
    describe("POST /create", () => {
        test("Expected: 401, User role does not allow this operation", async () => {});

        test("Expected: 500, Internal server error", async () => {});

        test("Expected: 200, event created", async () => {});
    });

    describe("PUT /update", () => {
        test("Expected: 500 with Internal server error, because of wrong req", async () => {
            prisma.event.update.mockImplementation(async (query) => {
                return { mockEventId: "mockId" };
            });

            const { statusCode, body } = await req
                .put("/api/event/update")
                .send({
                    user: { id: "mockUserId" },
                });

            expect(statusCode).toBe(500);
            expect(body.message).toEqual("Internal server error");
        });

        test("Expected: 500, because no event was updated", async () => {
            prisma.event.update.mockImplementation(async (query) => {
                return null;
            });

            const { statusCode, body } = await req
                .put("/api/event/update")
                .send({
                    user: { id: "mockUserId" },
                    event: { id: "mockEventId" },
                });

            expect(statusCode).toBe(500);
            expect(body.message).toEqual("Could not update event");
        });

        test("Expected: 200, event created", async () => {
            prisma.event.update.mockImplementation(async (query) => {
                return { mockEventId: "mockId" };
            });

            const res = await req.put("/api/event/update").send({
                user: { id: "mockUserId" },
                event: { id: "mockEventId" },
            });

            expect(res.statusCode).toBe(200);
        });
    });

    describe("DELETE /delete/:id", () => {
        // test("It should delete the event", async () => {
        //     const eventId = "123";
        //     const res = await req.delete(`/event/delete/${eventId}`);

        //     expect(res.status).toBe(200);
        // });

        test("test", async () => {});

        test("Expected: 200, Event deleted sccessfully", async () => {
            const mockEvent = {
                count: 3,
            };
            prisma.event.deleteMany.mockImplementation(async (query) => {
                return mockEvent;
            });

            const mockEventId = "fkjahd28o3042hf";
            const res = await req
                .delete(`/api/event/delete/${mockEventId}`)
                .send({
                    user: { id: "mockUserId" },
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toEqual("Event deleted sccessfully");
        });
    });

    describe("GET /get/all", () => {
        test("test", async () => {});

        test("test", async () => {});

        test("test", async () => {});
    });

    describe("GET /get/mine", () => {
        test("test", async () => {});

        test("test", async () => {});

        test("Expected: 200", async () => {
            const mockMyEvents = [
                {
                    id: "mockEventId",
                    title: "Vuoi non pagare le tasse?",
                },
                { id: "mockEventId2", title: "vuoi che i pesci respirino?" },
            ];
            prisma.event.findMany.mockImplementation(async (query) => {
                return mockMyEvents;
            });
            const user = {
                id: "mockId123",
                name: "Pancrazio",
            };
            const { statusCode } = await req
                .get("/api/event/get/mine")
                .send({ user });

            expect(statusCode).toBe(200);
        });
    });

    describe("GET /get/single/:id", () => {
        test("test", async () => {});

        test("test", async () => {});

        test('Expected: 200, with body response containing "fromCache: false" and event body', async () => {
            redisClient.json.get.mockImplementation(async () => false);
            redisClient.json.set.mockImplementation(async () => true);
            redisClient.expire.mockImplementation(async () => true);

            prisma.event.findUnique.mockImplementation(async (query) => {
                return {
                    id: "mockeventid123",
                };
            });

            const mockEventId = "123mock123";
            const { statusCode, body } = await req.get(
                `/api/event/get/single/${mockEventId}`
            );

            expect(statusCode).toBe(200);
            expect(body.event).toBeDefined();
            expect(body.fromCache).toBe(false);
        });
    });

    describe("GET /get/votes/:id", () => {
        test("test", async () => {});

        test("test", async () => {});

        test("test", async () => {});
    });

    describe("GET /get/participations/:id", () => {
        test("test", async () => {});

        test("test", async () => {});

        test("test", async () => {});
    });
});
