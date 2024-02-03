import express from 'express'
import { roles, verify } from '../controllers/auth.controller';
import { vote } from '../controllers/vote.controller';

export const voteRouter = express.Router();
voteRouter.use(express.json());

voteRouter.post('/create',
    verify,
    vote);