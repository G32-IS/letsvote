import express from 'express'
import { roles, authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';
import { create, get, getAll, update } from '../controllers/event.controller';

export const eventRouter = express.Router();
eventRouter.use(express.json());

eventRouter.post('/create',
    authorize,
    roles(UserRole.Admin),
    create);

eventRouter.put('/update',
    authorize,
    roles(UserRole.Admin),
    update);

eventRouter.get('/get',
    authorize,
    roles(UserRole.Admin),
    get);

eventRouter.use('/getAll',
    authorize,
    roles(UserRole.Admin, UserRole.SysAdmin, UserRole.Voter),
    getAll);

// eventRouter.use('/getResults')