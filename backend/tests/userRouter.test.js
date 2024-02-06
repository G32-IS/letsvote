import supertest from "supertest";
import { userRouter } from "../routes/user.router";
import { app } from "../utils/testServer";
import { verifyToken } from "../controllers/auth.controller";
import { prisma } from "../prisma/prisma-client";

app.use("/user", userRouter);

const req = supertest(app);

const mockedUser = {
    id: "65c0bea5959e924eaf699c67",
    hashedPassword:
        "$2b$10$BpqyEnABcemz8az/pLXJluPUQWjlNnRHdLnX8PKrE9lHOoohA9QPO",
    name: "Luca Verdi",
    role: "Voter",
    pob: {
        create: {
            region: "NA",
            locality: "F839",
        },
    },
};

jest.mock("../prisma/prisma-client", () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
    },
}));

// to mock verifyToken()
jest.mock("../controllers/auth.controller");

describe("Test user.router (/user)", () => {
    describe("GET /profile", () => {
        test("Expected: 500, because of no user given in the body", async () => {
            verifyToken.mockImplementation((req, res, next) => {
                req.body.user = undefined;
                next();
            });

            const res = await req.get("/user/profile");
            expect(res.statusCode).toBe(500);
        });

        test("Expected: 404, user not found", async () => {
            verifyToken.mockImplementation((req, res, next) => {
                req.body.user = {};
                next();
            });

            prisma.user.findUnique.mockImplementation(async () => {
                return undefined;
            });

            const { statusCode, body } = await req.get("/user/profile");
            expect(statusCode).toBe(404);
            expect(body.message).toEqual("User not found");
        });

        test("Expected: 200, and user data returned", async () => {
            prisma.user.findUnique.mockImplementation(async (query) => {
                if (query.where.id === mockedUser.id) return mockedUser;
                else return null;
            });

            verifyToken.mockImplementation((req, res, next) => {
                req.body.user = mockedUser;
                next();
            });

            const res = await req.get("/user/profile");
            expect(res.statusCode).toBe(200);
            expect(res.body.user.id).toEqual("65c0bea5959e924eaf699c67");
        });
    });

    describe("PUT /update", () => {
        test("Expected: 500, because of no user given in the body", () => {});

        test("Expected: 404, user not found", () => {});

        test("Expected: 200, and user data returned", async () => {
            verifyToken.mockImplementation((req, res, next) => {
                req.body.user = mockedUser;
                next();
            });
            prisma.user.update.mockImplementation(() => {
                return mockedUser;
            });
            const { statusCode, body } = await req.put("/user/update");
            expect(statusCode).toBe(200);
            expect(body.user).toBeDefined();
        });
    });
});
