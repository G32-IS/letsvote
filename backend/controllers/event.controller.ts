import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";

export const create = async (req: Request, res: Response) => {
    try {
        const { event, user } = req.body;

        const author = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                events: {
                    create: [
                        event
                    ]
                }
            }
        });

        if (author) {
            res.status(200).json({ event: event });
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
        const newEvent = await prisma.event.update({
            where: {
                id: event.id
            },
            data: event
        });

        if (event) {
            res.status(200).json({ event: event });
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
        const events = await prisma.event.findMany();

        if (events) {
            res.status(200).json({ events: events });
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}