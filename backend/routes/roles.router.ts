import express, { Request, Response } from "express";
import { roles, authorize } from "../controllers/auth.controller";
import { UserRole } from "@prisma/client";

export const rolesRouter = express();
rolesRouter.use(express.json());

rolesRouter.post('/request', authorize, roles(UserRole.Voter));