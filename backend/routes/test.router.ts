import express, {Request, Response} from 'express'
import { createIfNew, withSpid } from '../controllers/auth.controller';
import { PrismaClient } from '@prisma/client';

export const testRouter = express();
testRouter.use(express.json());

const prisma = new PrismaClient();

// Test server connection
testRouter.get("/", (req: Request, res: Response) => {
    res.json({ message: 'Connection succesful' });
});

// Test db connection
testRouter.get("/userCount", async (req: Request, res: Response) => {
    const countUsers = await prisma.user.count({});
    res.json({ count: countUsers })
});