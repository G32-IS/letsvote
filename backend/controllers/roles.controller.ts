import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";