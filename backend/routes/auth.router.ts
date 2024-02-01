import express, {Request, Response} from 'express'
import { authorize, createIfNew, } from '../controllers/auth.controller';

export const authRouter = express.Router();
authRouter.use(express.json());

// Spid authentication
// authRouter.post('/withSpid', withSpid);