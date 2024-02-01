import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }

    const key = process.env.JWT_SECRET!;
    jwt.verify(token, key, (err, user) => {
        if (err) return res.status(403).json({ message: 'Unauthorized' });
        req.body.user = user;
        next();
    });
}

export const accessRoles = (...args: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;

        if (args.some((role) => user?.role == role)) {
            next();
        } else {
            res.status(403).json({ message: "Unauthorized" });
        }

        next();
    };
};

export const createIfNew = async (req: Request, res: Response, next: NextFunction) => {
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
    // Check user
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

    // Check password
    const hashedPassword = await hashPassword(password);
    const validPassword = await passwordMatches(password, hashedPassword);
    if (!validPassword) {
        res.status(401).json({ message: "Invalid password" });
        return;
    }

    // Create token
    const key = process.env.JWT_SECRET;
    if (!key) {
        res.status(500).json({ message: "Could not generate token" });
        return;
    }
    const token = jwt.sign({ id: user.id }, key, {
        expiresIn: "7d",
    });
    res.status(200).json({ token: token });
};