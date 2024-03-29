import express from 'express'
import { roles, verifyToken } from '../controllers/auth.controller';
import { UserRole } from '@prisma/client';
import { createEvent, getAllEvents, getMyEvents, getEventParticipations, getEvent, getEventVotes, updateEvent, deleteEvent } from '../controllers/event.controller';

export const eventRouter = express.Router();
eventRouter.use(express.json());

eventRouter.post('/create',
    verifyToken,
    roles(UserRole.Admin),
    createEvent);

eventRouter.put('/update',
    verifyToken,
    roles(UserRole.Admin),
    updateEvent);

eventRouter.delete('/delete/:id',
    verifyToken,
    roles(UserRole.Admin),
    deleteEvent);

eventRouter.get('/get/all',
    getAllEvents);

eventRouter.get('/get/mine',
    verifyToken,
    roles(UserRole.Admin),
    getMyEvents);

eventRouter.get("/get/single/:id",
    getEvent);

eventRouter.get("/get/votes/:id",
    getEventVotes);

eventRouter.get("/get/participations/:id",
    getEventParticipations);