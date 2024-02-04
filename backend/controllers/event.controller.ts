import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";
import { redisClient } from "../redis/redis-client";

export const create = async (req: Request, res: Response) => {
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
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (err: any) {
            res.status(400).json({ message: "Bad request" });
        }
    });
}

export const update = async (req: Request, res: Response) => {
    try {
        const { event } = req.body
        const updatedEvent = await prisma.event.update({
            where: {
                id: event.id
            },
            data: event,
            include: {
                choices: true
            }
        });

        if (updatedEvent) {
            res.status(200).json({ event: updatedEvent });
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const getMine = async (req: Request, res: Response) => {
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

        if (events) {
            res.status(200).json({ events: events });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const getAll = async (req: Request, res: Response) => {
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
                res.status(200).json({ fromCache: false, events: events });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const getSingle = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const cachedEvent = await redisClient.json.get(`events:${eventId}`);

        console.log(cachedEvent)
        if (cachedEvent) {
            res.status(200).json({ fromCache: true, event: cachedEvent });
        } else {
            const event = await prisma.event.findUnique({
                where: {
                    id: eventId
                }
            });

            if (event) {
                await redisClient.json.set(`events:${eventId}`, "$", event);
                await redisClient.expire(`events:${eventId}`, 10);
                res.status(200).json({ fromCache: false, event: event });
            } else {
                res.status(500).json({ message: "Could not find event" });
            }
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const getVotes = async (req: Request, res: Response) => {
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
                res.status(200).json({ fromCache: false, votes: votes })
            } else {
                res.status(404).json({ message: "No votes found" });
            }
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const getPartecipations = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.id;
        const cachedPartecipation = await redisClient.get(`partecipations:${eventId}`);

        if (cachedPartecipation) {
            res.status(200).json({ fromCache: true, partecipations: cachedPartecipation });
        } else {
            const partecipations = await prisma.partecipation.findMany({
                where: {
                    eventId: eventId
                },
            });

            if (partecipations) {
                await redisClient.json.set(`votes:${eventId}`, "$", partecipations);
                await redisClient.expire(`votes:${eventId}`, 10);
                res.status(200).json({ fromCache: false, votes: partecipations})
            } else {
                res.status(404).json({ message: "No partecipations not found" });
            }
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}
