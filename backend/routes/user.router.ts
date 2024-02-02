import express from 'express'
import { authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';
import { profile, update } from '../controllers/user.controller';

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get('/profile', authorize, profile);
userRouter.put('/update', authorize, update);