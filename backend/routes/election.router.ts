import express, {Request, Response} from 'express'
import { authorize } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';

export const electionRouter = express.Router();
electionRouter.use(express.json());

// electionRouter.use('/getElections')
electionRouter.use('/getMyElections', authorize(UserRole.Admin))
electionRouter.use('/createElection', authorize(UserRole.Admin))
electionRouter.use('/updateElection', authorize(UserRole.Admin))
// electionRouter.use('/getResults')