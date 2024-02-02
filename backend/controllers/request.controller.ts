import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient, RequestState, User, UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";

export const request = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        const requestData = { };
        const newUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                requests: {
                    create: [ requestData ]
                }
            }
        });

        if (newUser) {
            res.status(200).json({ message: "Request created successfully "});
        } else {
            res.status(400).json({ message: "Request was not created successfully "});
        }
    } catch (err: any) {
        res.status(400).json({ message: "Bad request" });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const requests = await prisma.request.findMany();
        res.status(200).json({ requests: requests });
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const handleRequest = async (req: Request, res: Response) => {
    return prisma.$transaction(async _ => {
        const { request, user } = req.body;

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

        const newUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                role: request.role
            }
        });

        if (newUser) {
            res.status(200).json({ user: newUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    })
}