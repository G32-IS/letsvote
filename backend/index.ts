import { Request, Response } from "express";
import express from "express";

import { authRouter } from "./routes/auth.router";
import { userRouter } from "./routes/user.router";

const app = express();

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
app.use("/auth", authRouter);
app.use("/user", userRouter);

// Test endpoint
app.get("/test", (req: Request, res: Response) => {
    res.send("Hello World!");
});

const port = process.env.BE_PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
