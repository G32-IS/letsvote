import { NextFunction, Request, Response } from "express";
import { EventType, UserRole } from "@prisma/client";
import { hashPassword, passwordMatches } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client";
import type { Event } from '@prisma/client'