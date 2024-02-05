import express, { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

export const testRouter = express();
testRouter.use(express.json());

// Test server connection
testRouter.get("/", (req: Request, res: Response) => {
    res.json({ message: "Connection successful" });
});

// Test db connection
testRouter.get("/users", async (req: Request, res: Response) => {
    const countUsers = await prisma.user.count({});
    res.json({ count: countUsers });
});
