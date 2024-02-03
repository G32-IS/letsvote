import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

export const create = async (req: Request, res: Response) => {
    try {
        const { event, user } = req.body;
        const newEvent = await prisma.event.create({
            data: {
                title:      event.title,
                body:       event.body,
                type:       event.type,
                startDate:  event.startDate,
                endDate:    event.endDate,
                authorId:   user.id,
                choices: {
                    create: event.choices
                }
            },
            include: {
                choices: true
            }
        });

        if (newEvent) {
            res.status(200).json({ event: newEvent });
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
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

export const get = async (req: Request, res: Response) => {
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
            res.status(500).json({ message: "Internal server error" })
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                choices: true
            }
        });

        if (events) {
            res.status(200).json({ events: events });
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}