import express, {Request, Response} from 'express'
import { authorize, createIfNew, login } from '../controllers/auth.controller';

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post('/login', createIfNew, login);