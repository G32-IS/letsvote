import express from 'express'
import { roles, verify } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';
import { create, getAll, getMine, getParticipations, getSingle, getVotes, update } from '../controllers/event.controller';

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

eventRouter.get('/get/all',
    getAll);

eventRouter.get('/get/mine',
    verify,
    roles(UserRole.Admin),
    getMine);

eventRouter.get("/get/single/:id",
    verify,
    getSingle);

eventRouter.get("/get/votes/:id",
    verify,
    roles(UserRole.Admin),
    getVotes);

eventRouter.get("/get/participations/:id",
    verify,
    roles(UserRole.Admin),
    getParticipations);