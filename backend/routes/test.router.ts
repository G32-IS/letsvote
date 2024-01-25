import express, {Request, Response} from 'express'
import { createIfNew, withSpid } from '../controllers/user.controller';
import { PrismaClient } from '@prisma/client';

export const testRouter = express();
testRouter.use(express.json());

const prisma = new PrismaClient();

// Test server connection
testRouter.get("/", (req: Request, res: Response) => {
    res.send("Connected to server successfully!");
});

// Test db connection
testRouter.get("/users", async (req: Request, res: Response) => {
    const countUsers = await prisma.user.count({});
    res.send("n° of users: " + countUsers);
});