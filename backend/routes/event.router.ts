import express from 'express'
import { roles, verify } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';
import { create, get, getAll, update } from '../controllers/event.controller';

export const eventRouter = express.Router();
eventRouter.use(express.json());

eventRouter.post('/create',
    verify,
    roles(UserRole.Admin),
    create);

eventRouter.put('/update',
    verify,
    roles(UserRole.Admin),
    update);

eventRouter.get('/get',
    verify,
    roles(UserRole.Admin),
    get);

eventRouter.use('/getAll',
    verify,
    roles(UserRole.Admin, UserRole.SysAdmin, UserRole.Voter),
    getAll);