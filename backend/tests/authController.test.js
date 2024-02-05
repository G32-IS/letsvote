import express from "express";
import { authRouter } from "../routes/auth.router";
import supertest from "supertest";
import { login, logout } from "../controllers/auth.controller";
import { prisma } from "../prisma/prisma-client";
import jwt from "jsonwebtoken";
import * as utils from "../utils/bcrypt";
import { describe } from "node:test";

jest.mock("../prisma/prisma-client", () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
        },
    },
}));

const app = express();
app.use("/auth", authRouter);

const req = supertest(app);

// come creare il mock di prisma

describe("auth.router (/auth)", () => {
    describe("POST /login", () => {
        test("It should return 404 when user does not exist", async () => {
            // mock Prisma user.findUnique to return null
            prisma.user.findUnique.mockResolvedValue(null);

            const res = await req.post("/auth/login").send({
                user: {
                    email: "nonexistent@example.com",
                    password: "password",
                },
            });

            expect(res.status).toBe(404);
        });

        test("should return 401 when password is invalid", async () => {
            prisma.user.findUnique.mockResolvedValue({
                email: "test@example.com",
                hashedPassword:
                    "$2b$10$BpqyEnABcemz8az/pLXJluPUQWjlNnRHdLnX8PKrE9lHOoohA9QPO",
            });

            // mock passwordMatches to return false
            jest.spyOn(utils, "passwordMatches").mockReturnValue(false);

            const res = await req.post("/auth/login").send({
                user: {
                    email: "test@example.com",
                    password: "wrong_password",
                },
            });

            expect(res.status).toBe(401);
            expect(res.body).toEqual({ message: "Invalid password" });
        });

        test("It should return a token when login is successful", async () => {
            prisma.user.findUnique.mockResolvedValue({
                id: "65c0bea5959e924eaf699c67",
                email: "luca.verdi@gmail.com",
                hashedPassword:
                    "$2b$10$BpqyEnABcemz8az/pLXJluPUQWjlNnRHdLnX8PKrE9lHOoohA9QPO",
            });

            jest.spyOn(utils, "passwordMatches").mockReturnValue(true);

            const mockedToken =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzBiZWE1OTU5ZTkyNGVhZjY5OWM2NyIsImlhdCI6MTcwNzEzMTg4MywiZXhwIjoxNzA3NzM2NjgzfQ.skANWQzXtPWAu6a8kAejaR2fRXzlpV9Pwe1kVHSLW9k";
            // pretend the token generated is the above one
            jest.spyOn(jwt, "sign").mockReturnValue(mockedToken);

            const res = await req.post("/auth/login").send({
                user: {
                    email: "luca.verdi@gmail.com",
                    password: "password",
                },
            });

            expect(res.status).toBe(200);
            expect(res.body.user.id).toEqual("65c0bea5959e924eaf699c67");
            expect(res.header["set-cookie"][0]).toContain(
                `token=${mockedToken}`
            );
        });
    });

    describe("POST /logout", async () => {
        test("It should return 401 because no token is passed", async () => {
            const res = await req.post("/auth/logout").set("Cookie", []).send({
                user: {},
            });

            expect(res.status).toBe(401);
            expect(res.body.message).toEqual("User token was not provided");
        });

        // TODO: Non so come passare il token. mi dà sempre errore
        test("It should return 401 because of wrong token", async () => {
            const res = await req
                .post("/auth/logout")
                .set("Cookie", ["token=mocked_fake_token"])
                .send({
                    user: {},
                });

            expect(res.status).toBe(401);
            expect(res.body.message).toEqual("User token was not correct");
        });
    });
});
