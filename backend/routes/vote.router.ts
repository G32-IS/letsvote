import express from 'express'
import { accessRoles, authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const voteRouter = express.Router();
voteRouter.use(express.json());

voteRouter.post('/createVote',
    authorize,
    accessRoles(UserRole.Voter, UserRole.Admin, UserRole.SysAdmin));