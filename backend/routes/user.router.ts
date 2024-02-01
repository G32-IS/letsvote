import express, {Request, Response} from 'express'
import { accessRoles, authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post('/requestPermissions', authorize, accessRoles(UserRole.Voter))
userRouter.put('/updatePermissions', authorize, accessRoles(UserRole.Admin))
userRouter.delete('/deletePermissions', authorize, accessRoles(UserRole.Admin))