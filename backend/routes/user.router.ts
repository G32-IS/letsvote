import express, {Request, Response} from 'express'
import { authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post('/requestPermissions', authorize(UserRole.Voter))
userRouter.put('/updatePermissions', authorize(UserRole.Admin))
userRouter.delete('/deletePermissions', authorize(UserRole.Admin))
