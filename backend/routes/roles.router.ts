import express, { Request, Response } from "express";
import { roles, verify } from "../controllers/auth.controller";
import { UserRole } from "@prisma/client";

export const rolesRouter = express();
rolesRouter.use(express.json());

rolesRouter.post('/request', verify, roles(UserRole.Voter));