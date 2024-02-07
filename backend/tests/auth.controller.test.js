import { verifyToken, roles } from '../controllers/auth.controller';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/prisma-client';
import express from "express";
import supertest from "supertest";

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));

jest.mock('../prisma/prisma-client', () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
        },
    }
}));

describe('Test auth.controller.ts functions', () => {
    describe("Test verifyToken function", () => {
        test('should return 401 if token is not provided in cookies', async () => {
            const req = { 
                cookies: {},
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
    
            const next = jest.fn();
    
            await verifyToken(req, res, next);
    
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'User token was not provided' });
            expect(next).not.toHaveBeenCalled();
        });

        test('should return 401 if token verification fails', async () => {
            const token = 'invalid_token';
            const req = {
                cookies: { token },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const next = jest.fn();

            jwt.verify.mockImplementation((_, __, callback) => {
                callback(new Error('Token verification error'), null);
            });

            await verifyToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'User token was not correct' });
            expect(next).not.toHaveBeenCalled();
        });

        test('should return 404 if user is not found in the database', async () => {
            const token = 'valid_token';
            const userId = 123;
            const req = {
                cookies: { token },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                clearCookie: jest.fn(),
            };
            const next = jest.fn();

            jwt.verify.mockImplementation((_, __, callback) => {
                callback(null, { id: userId });
            });

            prisma.user.findUnique.mockResolvedValue(null);

            await verifyToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: `User ${userId} not found` });
            expect(next).not.toHaveBeenCalled();
            expect(res.clearCookie).toHaveBeenCalledWith('token');
        });
    })

    describe("Test roles function", () => {
        let mockReq;
        let mockRes;
        let mockNext;

        beforeEach(() => {
            mockReq = { body: {} };
            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };
            mockNext = jest.fn();
        });

        test('It should call next for allowed roles', async () => {
            mockReq.body.user = { role: "Admin" };

            const middleware = roles("Admin", "SysAdmin");
            await middleware(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockRes.status).not.toHaveBeenCalled();
        });

        test('It should return 401 for disallowed roles', async () => {
            mockReq.body.user = { role: "Voter" };

            const middleware = roles("Admin", "SysAdmin");
            await middleware(mockReq, mockRes, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "User role does not allow this operation",
            });
        });

        test('It should return 401 when role is missing', async () => {
            mockReq.body.user = {}; // No role provided

            const middleware = roles("Admin", "SysAdmin");
            await middleware(mockReq, mockRes, mockNext);

            expect(mockNext).not.toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "User role does not allow this operation",
            });
        });
    })
});

