import { Request, Response } from "express";;
import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi, { setup } from "swagger-ui-express";
import YAML from "yamljs";

import { authRouter } from "./routes/auth.router";
import { userRouter } from "./routes/user.router";
import { testRouter } from "./routes/test.router";
import { eventRouter } from "./routes/event.router";
import { voteRouter } from "./routes/vote.router";
import { requestRouter } from "./routes/request.router";
import { setupPrisma } from "./prisma/prisma-client";
import { setupRedis } from "./redis/redis-client";

export const app = express();

app.use(express.json());

app.use(cookieParser());

app.use((req: Request, res: Response, next: any) => {
    res.setHeader("Access-Control-Allow-Origin", `http://localhost:${process.env.FE_PORT}`);
    res.setHeader("Access-Control-Allow-Credentials", 'true');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Routes
app.use("/api/test", testRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/request", requestRouter);
app.use("/api/event", eventRouter);
app.use("/api/vote", voteRouter);

const swaggerDocument = YAML.load("./swagger.yaml");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.BE_PORT || 9999;
app.listen(port, () => {
    setupRedis();
    setupPrisma();
    console.log(`Server running http://localhost:${port}`)
});