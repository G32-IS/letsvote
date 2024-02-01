import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";

export const create = async (req: Request, res: Response) => {
    try {
        const eventData = {
            title: req.body.event.title,
            type: req.body.eventType,
            body: req.body.body,
            authorId: req.body.autorId,
        };

        const event = await prisma.event.create({
            data: eventData
        });

        if (event) {
            res.status(200).json({ event: event });
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    } catch (err: any) {
        res.status(400).json({ message: 'Bad request' });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const event = await prisma.event.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.event.title,
                type: req.body.eventType,
                body: req.body.body,
            }
        });

        if (event) {
            res.status(200).json({ event: event });
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    } catch (err: any) {
        res.status(400).json({ message: 'Bad request' });
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const userId = req.body.user.id;
        const events = await prisma.event.findMany({
            where: {
                authorId: userId
            }
        });

        if (events) {
            res.status(200).json({ events: events });
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    } catch (err: any) {
        res.status(400).json({ message: 'Bad request' });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany();

        if (events) {
            res.status(200).json({ events: events });
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    } catch (err: any) {
        res.status(400).json({ message: 'Bad request' });
    }
}
