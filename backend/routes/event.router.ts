import express, {Request, Response} from 'express'
import { accessRoles, authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';
import { create, get, getAll, update } from '../controllers/event.controller';

export const eventRouter = express.Router();
eventRouter.use(express.json());

eventRouter.post('/create', authorize, accessRoles(UserRole.Admin), create);
eventRouter.put('/update', authorize, accessRoles(UserRole.Admin), update);
eventRouter.get('/get', authorize, accessRoles(UserRole.Admin), get)
eventRouter.use('/getAll', authorize, accessRoles(UserRole.Admin, UserRole.SysAdmin, UserRole.Voter), getAll)
// eventRouter.use('/getResults')