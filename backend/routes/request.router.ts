import express, { Request, Response } from "express";
import { roles, verify } from "../controllers/auth.controller";
import { UserRole } from "@prisma/client";
import { getAll, handleRequest, request } from "../controllers/request.controller";

export const requestRouter = express();
requestRouter.use(express.json());

requestRouter.post('/create', verify, roles(UserRole.Voter), request);
requestRouter.put('/handle', verify, roles(UserRole.SysAdmin), handleRequest);
requestRouter.get('/getall', verify, roles(UserRole.SysAdmin), getAll);