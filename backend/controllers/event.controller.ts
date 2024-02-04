import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";
import { redisClient } from "../redis/redis-client";

export const createEvent = async (req: Request, res: Response) => {
    return prisma.$transaction(async _ => {
        try {
            const { event, user } = req.body;
            const newEvent = await prisma.event.create({
                data: {
                    title: event.title,
                    body: event.body,
                    type: event.type,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    authorId: user.id,
                    pobId: user.pobId,
                    choices: {
                        create: event.choices
                    }
                },
                include: {
                    choices: true
                }
            });

            const eventsExists = await redisClient.json.type("events");

            if (eventsExists) {
                await redisClient.json.arrAppend("events", "$", newEvent);
            }

            if (newEvent) {
                res.status(200).json({ event: newEvent });
            } else {
                res.status(500).json({ message: "Could not create event" });
            }
        } catch (err: any) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { event, user } = req.body
        const updatedEvent = await prisma.event.update({
            where: {
                id: event.id,
                authorId: user.id
            },
            data: event,
            include: {
                choices: true
            }
        });

        if (updatedEvent) {
            res.status(200).json({ event: updatedEvent });
        } else {
            res.status(500).json({ message: "Could not update event" })
        }
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { event, user } = req.body;
        const deletedEvent = await prisma.event.delete({
            where: {
                id: event.id,
                authorId: user.id
            }
        });

        if (deletedEvent) {
            res.status(200).json({ message: "Event deleted sccessfully" });
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMyEvents = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;

        const events = await prisma.event.findMany({
            where: {
                authorId: user.id
            },
            include: {
                choices: true
            }
        });

        res.status(200).json({ events: events });
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const cachedEvents = await redisClient.json.get("events");

        if (cachedEvents) {
            res.status(200).json({ fromCache: true, events: cachedEvents });
        } else {
            const events = await prisma.event.findMany({
                include: {
                    choices: true
                }
            });

            if (events) {
                await redisClient.json.set("events", "$", events);
                await redisClient.expire("events", 10);
            }
            res.status(200).json({ fromCache: false, events: events });
        }
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const cachedEvent = await redisClient.json.get(`events:${eventId}`);

        if (cachedEvent) {
            res.status(200).json({ fromCache: true, event: cachedEvent });
        } else {
            const event = await prisma.event.findUnique({
                where: {
                    id: eventId
                },
                include: {
                    choices: true
                }
            });

            if (event) {
                await redisClient.json.set(`events:${eventId}`, "$", event);
                await redisClient.expire(`events:${eventId}`, 10);
                res.status(200).json({ fromCache: false, event: event });
            } else {
                res.status(404).json({ message: "Event not found" });
            }
        }
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getEventVotes = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const cachedVotes = await redisClient.json.get(`votes:${eventId}`);

        if (cachedVotes) {
            res.status(200).json({ fromCache: true, votes: cachedVotes });
        } else {
            const votes = await prisma.vote.findMany({
                where: {
                    eventId: eventId
                },
            });

            if (votes) {
                await redisClient.json.set(`votes:${eventId}`, "$", votes);
                await redisClient.expire(`votes:${eventId}`, 10);
            }
            res.status(200).json({ fromCache: false, votes: votes })
        }
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getEventParticipations = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const cachedParticipation = await redisClient.get(`participations:${eventId}`);

        if (cachedParticipation) {
            res.status(200).json({ fromCache: true, participations: cachedParticipation });
        } else {
            const participations = await prisma.participation.findMany({
                where: {
                    eventId: eventId
                },
            });

            if (participations) {
                await redisClient.json.set(`votes:${eventId}`, "$", participations);
                await redisClient.expire(`votes:${eventId}`, 10);
            }
            res.status(200).json({ fromCache: false, votes: participations })
        }
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}
