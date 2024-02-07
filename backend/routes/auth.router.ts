import express from 'express'
import { verifyToken, login, logout } from '../controllers/auth.controller';

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post('/login', login);
authRouter.post('/logout', verifyToken, logout);
