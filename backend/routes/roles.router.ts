import express, { Request, Response } from "express";
import { accessRoles, authorize } from "../controllers/auth.controller";
import { UserRole } from "@prisma/client";

export const rolesRouter = express();
rolesRouter.use(express.json());

rolesRouter.post('/request', authorize, accessRoles(UserRole.Voter));