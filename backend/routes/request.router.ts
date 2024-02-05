import express, { Request, Response } from "express";
import { roles, verifyToken } from "../controllers/auth.controller";
import { UserRole } from "@prisma/client";
import { getRequest, getAllRequests, handleRequest, createRequest } from "../controllers/request.controller";

export const requestRouter = express();
requestRouter.use(express.json());

requestRouter.post("/create", verifyToken, roles(UserRole.Voter), createRequest);
requestRouter.put("/handle", verifyToken, roles(UserRole.SysAdmin), handleRequest);
requestRouter.get("/get/all", verifyToken, roles(UserRole.SysAdmin), getAllRequests);
requestRouter.get("/get/single/:id", verifyToken, roles(UserRole.SysAdmin), getRequest);