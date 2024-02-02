import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma-client";

export const vote = async (req: Request, res: Response) => {
    const { choice, eventId, user } = req.body;

    const choices = await prisma.choice.findMany({
        where: {
            eventId: eventId
        }
    });

    if (!choices.includes(choice)) {
        res.status(400).json({ message: "Bad request"});
        return;
    }

    // TODO
}