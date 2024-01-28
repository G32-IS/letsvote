import next, { Request, Response } from "express"
import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from 'jsonwebtoken'
import { hash } from "bcrypt";

const prisma = new PrismaClient()

export const createIfNew = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user) {
        return next();
    }

    const hashedPassword = await hashPassword(password);
    const userData = {
        email: email,
        hashedPassword: hashedPassword,
        role: UserRole.Voter
    };
    const newUser = await prisma.user.create({
        data: userData
    });

    if (!newUser) {
        res.status(400).json({ message: 'Could not create user' });
        return;
    }

    next();
}

export const withSpid = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const hashedPassword = await hashPassword(password);
    try {
        const validPassword = await passwordMatches(password, hashedPassword);

        if (!validPassword) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        // Set cookie
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" })
        res.cookie("token", token, { httpOnly: true, secure: true, path: "/", });

        res.status(200).json({ message: 'Login successfull' });
    } catch (err: any) {
        res.status(500).json(err);
    }
}
