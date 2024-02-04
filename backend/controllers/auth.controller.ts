import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma-client";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "User token was not provided" });
        return;
    }

    const key = process.env.JWT_SECRET!;
    jwt.verify(token, key, async (err: any, user: any) => {
        if (err) {
            res.status(401).json({ message: "User token was not correct" });
        } else {
            try {
                const userInfo = await prisma.user.findUnique({
                    where: {
                        id: user.id
                    }
                });
                if (userInfo) {
                    req.body.user = userInfo;
                    next();
                } else {
                    res.clearCookie("token");
                    res.status(404).json({ message: `User ${user.id} not found` });
                }
            } catch (err: any) {
                res.status(500).json({
                    message: "Internal server error"
                });
            }
        }
    });
}

export const roles = (...args: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;

        if (args.some((role) => user?.role == role)) {
            next();
        } else {
            res.status(401).json({ message: "User role does not allow this operation" });
            return;
        }
    };
};

export const createIfNew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body.user;

        if (!email) {
            res.status(400).json({ message: "Email was not provided" });
            return;
        }

        if (!password) {
            res.status(400).json({ message: "Password was not provided" });
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            const pobData = {
                region: "MI",
                locality: "F205"
            }

            const pob = await prisma.placeOfBirth.findFirst({
                where: pobData
            })

            if (pob) {
                const hashedPassword = await hashPassword(password);
                const newUser = await prisma.user.create({
                    data: {
                        email: email,
                        hashedPassword: hashedPassword,
                        role: UserRole.Voter,
                        pobId: pob.id
                    }
                });

                if (!newUser) {
                    res.status(400).json({ message: "Could not create user" });
                    return;
                }
            } else {
                const hashedPassword = await hashPassword(password);
                const newUser = await prisma.user.create({
                    data: {
                        email: email,
                        hashedPassword: hashedPassword,
                        role: UserRole.Voter,
                        pob: {
                            create: pobData
                        }
                    }
                });
            }
        }
        next();
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // Check user
        const { user: { email, password }} = req.body;
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
        const validPassword = await passwordMatches(password, user.hashedPassword);
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
        res.cookie("token", token, { httpOnly: true, secure: true, path: "/" })

        res.status(200).json({ user: user });
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).end();
}