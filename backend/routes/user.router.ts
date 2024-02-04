import express from 'express'
import { verifyToken } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';
import { getUser, updateUser } from '../controllers/user.controller';

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/profile', verifyToken, getUser);
userRouter.put('/update', verifyToken, updateUser);