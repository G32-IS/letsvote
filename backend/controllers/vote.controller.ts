import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";
import { eventNames } from "process";

export const vote = async (req: Request, res: Response) => {
    return prisma.$transaction(async _ => {
        const { vote, user } = req.body;

        try {
            // Create vote
            const newVote = await prisma.vote.create({
                data: vote
            });

            if (!newVote) {
                res.status(400).json({ message: "Could not create vote" });
                return;
            }

            // Create partecipation
            const newPartecipation = await prisma.partecipation.create({
                data: {
                    userId: user.id,
                    eventId: newVote.eventId
                }
            });

            if (newPartecipation) {
                res.status(200).json({ partecipation: newPartecipation });
            } else {
                res.status(400).json({ message: "Could not create partecipation"});
            }
        } catch (err: any) {
            res.status(400).json({ message: "Bad request" });
        }
    });
}