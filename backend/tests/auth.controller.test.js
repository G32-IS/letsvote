import { verifyToken } from '../controllers/auth.controller';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/prisma-client';

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
});
