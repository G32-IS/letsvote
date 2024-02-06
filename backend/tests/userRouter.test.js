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

jest.mock("../controllers/auth.controller");
jest.mock("../prisma/prisma-client", () => ({
    prisma: {
        user: {
            findUnique: jest.fn().mockResolvedValue({
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
            }),
        },
    },
}));

// prisma.user.findUnique.mockImplementation(async (query) => {
//     if (query.where.id === mockedUser.id) {
//         return mockedUser;
//     }
//     return null;
// })

afterEach(() => {
    jest.clearAllMocks();
});

describe("Test user.router (/user)", () => {
    describe("GET /profile", () => {
        test("Expected: 500, because of no user given in the body", async () => {
            verifyToken.mockImplementation((req, res, next) => {
                res.status(401).json({ message: "User token was not correct" });
            });

            const res = await req.get("/user/profile");
            expect(res.statusCode).toBe(401);
        });

        test("Expected: 404, User not found", () => {});

        test("Expected: 200, and user data", async () => {
            verifyToken.mockImplementation((req, res, next) => {
                // Simulating a successful token verification:
                req.body.user = mockedUser;
                next();
            });

            const res = await req.get("/user/profile");
            expect(res.statusCode).toBe(200);
            expect(res.body.user.id).toEqual("65c0bea5959e924eaf699c67");
        });
    });

    describe("UPDATE /update", () => {
        test("Expected: 500, because of no user given in the body", () => {});

        test("Expected: 404, User not found", () => {});

        test("Expected: 200, and user data updated", () => {});
    });
});
