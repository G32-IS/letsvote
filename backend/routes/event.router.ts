import express, {Request, Response} from 'express'
import { authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const eventRouter = express.Router();
eventRouter.use(express.json());

// eventRouter.use('/getEvents')
eventRouter.get('/getMyEvents', authorize(UserRole.Admin))
eventRouter.post('/createEvent', authorize(UserRole.Admin))
eventRouter.put('/updateEvent', authorize(UserRole.Admin))
// eventRouter.use('/getResults')