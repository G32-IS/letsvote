import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

export const vote = async (req: Request, res: Response) => {
    return prisma.$transaction(async _ => {
        try {
            const { vote, user } = req.body;

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

export const check = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vote, user } = req.body;

        const event = await prisma.event.findUnique({
            where: {
                id: vote.eventId
            }
        });

        if (!event) {
            res.status(404).json({ message: "Event not found"});
            return;
        }

        // Check if the date is correct
        const currentDate = new Date();

        if (currentDate < event.startDate) {
            res.status(401).json({ message: "Event has not started yet"});
            return;
        }

        if (currentDate > event.endDate) {
            res.status(401).json({ message: "Event has already terminated"});
            return;
        }

        // Check if the user already partecipated
        const partecipation = await prisma.partecipation.findFirst({
            where: {
                userId: user.id,
                eventId: event.id
            }
        });

        if (partecipation) {
            res.status(401).json({ message: "User already partecipated to this event" });
            return;
        }

        next();

    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}