import express from "express"
import { roles, verifyToken } from "../controllers/auth.controller";
import { checkPrerequisites, createVote } from "../controllers/vote.controller";

export const voteRouter = express.Router();
voteRouter.use(express.json());

voteRouter.post("/create",
    verifyToken,
    checkPrerequisites,
    createVote);