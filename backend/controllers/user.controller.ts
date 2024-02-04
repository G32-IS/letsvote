import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

export const getUser = async (req: Request, res: Response) => {
    try {
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
            res.status(404).json({ message: "User not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
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
            res.status(404).json({ message: "User not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}