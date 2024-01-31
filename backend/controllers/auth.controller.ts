import { NextFunction, Request, Response } from "express";
import { PrismaClient, User, UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();

export const authorize = (...args: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { email = "", password = "" } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        try {
            const hashedPassword = await hashPassword(password);
            const isValid = await passwordMatches(
                hashedPassword,
                user!.hashedPassword
            );

            if (isValid && args.some((role) => user?.role == role)) {
                next();
            } else {
                res.status(403).json({ message: "Unauthorized" });
            }
        } catch (err: any) {
            res.status(400).json({ message: "Bad request" });
        }

        next();
    };
};

export const createIfNew = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Bad request" });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        const hashedPassword = await hashPassword(password);
        const userData = {
            email: email,
            hashedPassword: hashedPassword,
            role: UserRole.Voter,
        };
        const newUser = await prisma.user.create({
            data: userData,
        });

        if (!newUser) {
            res.status(400).json({ message: "Could not create user" });
            return;
        }
    }

    next();
};

export const withSpid = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const hashedPassword = await hashPassword(password);
    const validPassword = await passwordMatches(password, hashedPassword);

    if (!validPassword) {
        res.status(401).json({ message: "Invalid password" });
        return;
    }

    // Set cookie
    if (!process.env.JWT_SECRET) {
        res.status(500).json({ message: "Could not generate token" });
        return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true, secure: true, path: "/" });
    res.status(200).json({ message: "Login successful" });
};
