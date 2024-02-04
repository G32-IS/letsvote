import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

export const profile = async (req: Request, res: Response) => {
    const { user } = req.body;
    const userData = await prisma.user.findUnique({
        where: {
            id: user.id
        }, include: {
            events: true,
            participations: true,
            requests: true
        }
    });

    if (userData) {
        res.status(200).json({ user: userData });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

export const update = async (req: Request, res: Response) => {
    const { user } = req.body;
    const newUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: user
    });

    if (newUser) {
        res.status(200).json({ user: newUser });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}