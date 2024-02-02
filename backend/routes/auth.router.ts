import express, {Request, Response} from 'express'
import { verify, createIfNew, login, logout } from '../controllers/auth.controller';

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post('/login', createIfNew, login);
authRouter.post('/logout', verify, logout);