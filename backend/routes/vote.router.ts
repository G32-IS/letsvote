import express from 'express'
import { roles, authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const voteRouter = express.Router();
voteRouter.use(express.json());

voteRouter.post('/createVote',
    authorize,
    roles(UserRole.Voter, UserRole.Admin, UserRole.SysAdmin));