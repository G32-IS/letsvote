import express from "express";
import supertest from "supertest";
import { app } from "../utils/testServer";
import {
    getRequest,
    getAllRequests,
    handleRequest,
    createRequest,
} from "../controllers/request.controller";
import { prisma } from "../prisma/prisma-client";

const requestRouter = express.Router();
requestRouter.use(express.json());

requestRouter.post("/create", createRequest);
requestRouter.put("/handle", handleRequest);
requestRouter.get("/get/all", getAllRequests);
requestRouter.get("/get/single/:id", getRequest);

app.use("/api/request", requestRouter);

const req = supertest(app);

jest.mock("../prisma/prisma-client", () => ({
    prisma: {
        request: {
            findFirst: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        user: {
            update: jest.fn(),
        },
    },
}));

describe("Test request.router (/request)", () => {
    describe("POST /create", () => {
        test("Expected: 422, user has already a pending request", async () => {
            prisma.request.findFirst.mockImplementation(async (query) => true);
            prisma.request.create.mockImplementation(async (query) => true);

            const mockUser = {};
            const { statusCode, body } = await req
                .post("/api/request/create")
                .send({ user: mockUser });

            expect(statusCode).toBe(422);
            expect(body?.message).toEqual("User already has a pending request");
        });

        test("Expected: 500, because unable to create request", async () => {
            prisma.request.findFirst.mockImplementation(async (query) => false);
            prisma.request.create.mockImplementation(async (query) => false);

            const mockUser = {};
            const { statusCode, body } = await req
                .post("/api/request/create")
                .send({ user: mockUser });

            expect(statusCode).toBe(500);
            expect(body?.message).toEqual("Could not create request");
        });

        test("Expected: 200", async () => {
            prisma.request.findFirst.mockImplementation(async (query) => false);
            prisma.request.create.mockImplementation(async (query) => true);

            const mockUser = {};
            const { statusCode, body } = await req
                .post("/api/request/create")
                .send({ user: mockUser });

            expect(statusCode).toBe(200);
        });
    });

    describe("PUT /handle", () => {
        test("test", async () => {
            // const res = await req.put("/api/request/handle");
        });

        test("test", async () => {});
    });

    describe("GET /get/all", () => {
        test("test", async () => {
            prisma.request.findMany.mockImplementation(async () => [
                { idReq1: "123" },
                { idReq2: "345" },
            ]);
            const { statusCode, body } = await req.get("/api/request/get/all");

            expect(statusCode).toBe(200);
            expect(body.requests).toBeDefined();
        });

        test("test", async () => {});
    });

    describe("GET /get/single/:id", () => {
        test("Expected: 500, for wrong call of findUnique()", async () => {
            const mockRequestId = "mock123";
            // simulate a wrong call to findUnique by do not declaring the query param
            prisma.request.findUnique.mockImplementation(async () => {
                if (query.where.id === mockRequestId)
                    return { id: mockRequestId };
                return null;
            });

            const { statusCode, body } = await req.get(
                `/api/request/get/single/${mockRequestId}`
            );

            expect(statusCode).toBe(500);
            expect(body.message).toEqual("Internal server error");
        });

        test("Expected: 200, and request returned", async () => {
            const mockRequestId = "mock123";
            prisma.request.findUnique.mockImplementation(async (query) => {
                if (query.where.id === mockRequestId)
                    return { id: mockRequestId };
                return null;
            });

            const { statusCode, body } = await req.get(
                `/api/request/get/single/${mockRequestId}`
            );

            expect(statusCode).toBe(200);
            expect(body.request).toBeDefined();
        });
    });
});
