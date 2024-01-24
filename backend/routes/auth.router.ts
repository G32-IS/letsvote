import express, {Request, Response} from 'express'
import jwt from "jsonwebtoken";
import { PrismaClient, User, UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from '../utils/bcrypt';

export const authRouter = express.Router();

authRouter.use(express.json());

const prisma = new PrismaClient();

authRouter.get('/spid',async (req: Request, res: Response) => {
    res.send('Hello World!');
})

// Get all users
authRouter.get('/', async (req: Request, res: Response) => {
})

// Login
authRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        res.status(404).json({message: 'User not found'});
        return;
    }

    const hash = user.password;
    try {
        const validPassword = await passwordMatches(password, hash);

        if (!validPassword) {
            res.status(401).json({message: 'Invalid password'});
            return;
        }

        // Set cookie
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d"})
        res.cookie("token", token, { httpOnly: true, secure: true, path: "/", });

        res.status(200).json({message: 'Login successfull'});
    } catch (err: any) {
        res.status(500).json(err);
    }
});