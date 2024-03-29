import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";
import { EventType } from "@prisma/client";

export const createVote = async (req: Request, res: Response) => {
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

            // Create participation
            const newParticipation = await prisma.participation.create({
                data: {
                    userId: user.id,
                    eventId: newVote.eventId
                }
            });

            if (newParticipation) {
                res.status(200).json({ participation: newParticipation });
            } else {
                res.status(500).json({ message: "Could not create participation"});
            }
        } catch (err: any) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}

export const checkPrerequisites = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vote, user } = req.body;

        const event = await prisma.event.findUnique({
            where: {
                id: vote.eventId
            },
            include: {
                pob: true
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

        // Check if the user has already partecipated
        const participation = await prisma.participation.findFirst({
            where: {
                userId: user.id,
                eventId: event.id
            }
        });

        if (participation) {
            res.status(422).json({ message: "User has already partecipated in this event" });
            return;
        }

        // Check if the place of birth is correct
        const userPob = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                pob: true
            }
        });

        if (!userPob) {
            res.status(500).json({ message: "User did not provide a valid place of birth" });
            return;
        }

        switch (event.type) {
            case EventType.ElezioneComunale: {
                if (event.pob != userPob.pob) {
                    res.status(401).json({ message: "User place of birth does not match the event's" });
                    return;
                }
            }
            break;
            case EventType.ElezioneProvinciale: {
                if (event.pob.region != userPob.pob.region) {
                    res.status(401).json({ message: "User region does not match the event's" });
                    return;
                }
            }
            break;
            case EventType.ElezioneRegionale: {
                if (event.pob.region != userPob.pob.region) {
                    res.status(401).json({ message: "User region does not match the event's" });
                    return;
                }
            }
            break;
            case EventType.ElezioneParlamentare: {
            }
            break;
            case EventType.ReferendumRegionale: {
                if (event.pob.region != userPob.pob.region) {
                    res.status(401).json({ message: "User region does not match the event's" });
                    return;
                }
            }
            break;
            case EventType.ReferendumNazionale: {
            }
            break;
        }

        next();

    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}
