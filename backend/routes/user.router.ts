import express from 'express'
import { verify } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';
import { profile, update } from '../controllers/user.controller';

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/profile', verify, profile);
userRouter.put('/update', verify, update);