import supertest from "supertest";
import { prisma } from "../prisma/prisma-client";
import jwt from "jsonwebtoken";
import * as utils from "../utils/bcrypt";
import { app } from "../utils/testServer";
import { login, logout } from '../controllers/auth.controller';
import express from "express";

require('dotenv').config();

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post("/login", login);
authRouter.post("/logout", logout);

app.use("/api/auth", authRouter);

const req = supertest(app);

jest.mock("../prisma/prisma-client", () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
        },
    },
}));

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("auth.router (/auth)", () => {
    describe("POST /login", () => {
        test("It should return 404 when user does not exist", async () => {
            // mock Prisma user.findUnique to return null
            prisma.user.findUnique.mockImplementation(async () => null);

            const res = await req.post("/api/auth/login").send({
                user: {
                    email: "nonexistent@example.com",
                    password: "password",
                },
            });

            expect(res.status).toBe(404);
        });

        test("should return 401 when password is invalid", async () => {
            prisma.user.findUnique.mockImplementation(async () => {
                return {
                    email: "test@example.com",
                    hashedPassword:
                    "$2b$10$BpqyEnABcemz8az/pLXJluPUQWjlNnRHdLnX8PKrE9lHOoohA9QPO",
                }
            });

            // mock passwordMatches to return false
            jest.spyOn(utils, "passwordMatches").mockReturnValue(false);

            const res = await req.post("/api/auth/login").send({
                user: {
                    email: "test@example.com",
                    password: "wrong_password",
                },
            });

            expect(res.status).toBe(401);
            expect(res.body).toEqual({ message: "Invalid password" });
        });

        test("It should return a token when login is successful", async () => {
            prisma.user.findUnique.mockImplementation(async () => {
                return {
                    id: "65c0bea5959e924eaf699c67",
                    hashedPassword:
                        "$2b$10$BpqyEnABcemz8az/pLXJluPUQWjlNnRHdLnX8PKrE9lHOoohA9QPO",
                }
            });

            jest.spyOn(utils, "passwordMatches").mockReturnValue(true);

            const mockedToken = "$2b$10$BpqyEnABcemz8az/pLXJluPUQWjlNnRHdLnX8PKrE9lHOoohA9QPO";
            // pretend the token generated is the above one
            jest.spyOn(jwt, "sign").mockReturnValue(mockedToken);

            const res = await req.post("/api/auth/login").send({
                user: {
                    email: "luca.verdi@gmail.com",
                    password: "password",
                },
            });

            expect(res.status).toBe(200);
            expect(res.body.user.id).toEqual("65c0bea5959e924eaf699c67");
            expect(res.header["set-cookie"][0]).toMatch(`token=`);
        });
    });

    describe("POST /logout", () => {
        // test("It should return 401 because no token is passed", async () => {
        //     const res = await req.post("/auth/logout").set("Cookie", []).send({
        //         user: {},
        //     });

        //     expect(res.status).toBe(401);
        //     expect(res.body.message).toEqual("User token was not provided");
        // });

        let mockReq;
        let mockRes;

        beforeEach(() => {
            mockReq = {}; // Assuming logout does not use req, it's an empty object here
            mockRes = {
            clearCookie: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis(),
            };
        });

        test('It should clear the token cookie and respond with 200 status', async () => {
            await logout(mockReq, mockRes);

            // Verify clearCookie was called with the correct cookie name
            expect(mockRes.clearCookie).toHaveBeenCalledWith("token");

            // Verify response status was set to 200
            expect(mockRes.status).toHaveBeenCalledWith(200);

            // Verify response was properly ended
            expect(mockRes.end).toHaveBeenCalled();
        });
    });
});
