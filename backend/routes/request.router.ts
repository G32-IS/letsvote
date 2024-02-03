import express, { Request, Response } from "express";
import { roles, verify } from "../controllers/auth.controller";
import { UserRole } from "@prisma/client";
import { getAll, handle, request } from "../controllers/request.controller";

export const requestRouter = express();
requestRouter.use(express.json());

requestRouter.post("/create", verify, roles(UserRole.Voter), request);
requestRouter.put("/handle", verify, roles(UserRole.SysAdmin), handle);
requestRouter.get("/get/:id", verify, roles(UserRole.SysAdmin), getAll);
requestRouter.get("/get/all", verify, roles(UserRole.SysAdmin), getAll);