import { Request, Response } from "express";
import express from "express";

import { authRouter } from "./routes/auth.router";
import { userRouter } from "./routes/user.router";
import { testRouter } from "./routes/test.router";
import { eventRouter } from "./routes/event.router";
import { voteRouter } from "./routes/vote.router";

export const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: any) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

// Routes
app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/vote", voteRouter);

const port = process.env.BE_PORT || 9999;
app.listen(port, () => console.log(`Server running http://localhost:${port}`));
