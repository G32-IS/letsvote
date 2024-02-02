import express, {Request, Response} from 'express'
import { verify, createIfNew, login } from '../controllers/auth.controller';

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post('/login', createIfNew, login);