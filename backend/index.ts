import { Request, Response } from 'express';

// import dotenv from 'dotenv';
// dotenv.config()

const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.use((req: Request, res: Response, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//test endpoint
app.get('/test', (req: Request, res: Response) => {
    res.send('Hello World!');
});

//get all users
app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

//insert new user
app.post('/user', async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    res.json(user);
});

app.listen(process.env.BE_PORT, () => console.log(`Server running on port ${process.env.BE_PORT}`));
