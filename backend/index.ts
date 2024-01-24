import { Request, Response } from "express";

import jwt from "jsonwebtoken";

import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

import express from "express";
const app = express();

import { hashPassword, passwordMatches } from "./utils/bcrypt";

app.use(express.json());

app.use((req: Request, res: Response, next: any) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.get("/", (req: Request, res: Response) => {
    res.send("Connected to server successfully!");
});

//test endpoint
app.get("/test", (req: Request, res: Response) => {
    res.send("Hello test!");
});

//get all users
app.get("/users", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

// insert new user
app.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const userData = { name: name, email: email, password: hashedPassword };

        const data = await prisma.user.create({
            data: userData,
        });

        res.status(201).json(data);
    } catch (err: any) {
        res.status(500).json(err);
    }
});

// login
app.post("/login", async (req: Request, res: Response) => {
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

    const hash = user.password;
    try {
        const validPassword = await passwordMatches(password, hash);

        if (!validPassword) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }

        //set cookie
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });
        res.cookie("token", token, { httpOnly: true, secure: true, path: "/" });

        res.status(200).json({ message: "Login successfull" });
    } catch (err: any) {
        res.status(500).json(err);
    }
});

const port = process.env.BE_PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
