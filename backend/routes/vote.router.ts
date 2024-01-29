import express, {Request, Response} from 'express'
import { authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const voteRouter = express.Router();
voteRouter.use(express.json());

voteRouter.post('/createVote', authorize(UserRole.Voter, UserRole.Admin, UserRole.SysAdmin))
