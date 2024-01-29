import express, {Request, Response} from 'express'
import { authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const electionRouter = express.Router();
electionRouter.use(express.json());

// electionRouter.use('/getElections')
electionRouter.get('/getMyElections', authorize(UserRole.Admin))
electionRouter.post('/createElection', authorize(UserRole.Admin))
electionRouter.put('/updateElection', authorize(UserRole.Admin))
// electionRouter.use('/getResults')
