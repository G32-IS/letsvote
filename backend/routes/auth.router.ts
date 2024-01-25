import express, {Request, Response} from 'express'
import { createIfNew, withSpid } from '../controllers/user.controller';

export const authRouter = express.Router();
authRouter.use(express.json());

// Spid authentication
authRouter.post('/withSpid', createIfNew, withSpid);