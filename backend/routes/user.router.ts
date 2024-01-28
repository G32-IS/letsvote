import express, {Request, Response} from 'express'
import { authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.use('/requestPermissions', authorize(UserRole.Voter))
userRouter.use('/updatePermissions', authorize(UserRole.Admin))
userRouter.use('/deletePermissions', authorize(UserRole.Admin))