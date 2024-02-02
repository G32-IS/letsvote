import express from 'express'
import { roles, verify } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const voteRouter = express.Router();
voteRouter.use(express.json());

voteRouter.post('/createVote',
    verify,
    roles(UserRole.Voter, UserRole.Admin, UserRole.SysAdmin));