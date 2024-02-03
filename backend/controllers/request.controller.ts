import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";
import { RequestState, UserRole } from "@prisma/client";

export const request = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;

        const newRequest = await prisma.request.create({
            data: {
                userId: user.id
            }
        });

        if (newRequest) {
            res.status(200).json({ message: "Request created successfully "});
        } else {
            res.status(400).json({ message: "Could not create request"});
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const getAll = async (res: Response) => {
    try {
        const requests = await prisma.request.findMany({
            include: {
                user: true
            }
        })
        res.status(200).json({ requests: requests });
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const request = await prisma.request.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (request) {
            res.status(200).json({ request: request });
        } else {
            res.status(404).json({ message: "Request not found" });
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const handle = async (req: Request, res: Response) => {
    return prisma.$transaction(async _ => {
        try {
            const { request } = req.body;
            const newRequest = await prisma.request.update({
                where: {
                    id: request.id
                },
                data: {
                    state: request.state
                }
            });

            if (!newRequest) {
                res.status(404).json({ message: "Request not found" });
                return;
            }

            if (newRequest.state === RequestState.Accepted) {
                const newUser = await prisma.user.update({
                    where: {
                        id: request.userId
                    },
                    data: {
                        role: UserRole.Admin
                    }
                });

                if (newUser) {
                    res.status(200).json({ user: newUser });
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            }
        } catch (err: any) {
            res.status(400).json({ message: "Bad request" });
            return;
        }
    });
}