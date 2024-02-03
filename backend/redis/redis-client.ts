import { createClient } from "redis";

export const redisClient = createClient();

export const setupRedis = () => {
    console.log("Setting up redis...");
    redisClient.on("error", (err: any) => console.error(err.message));
    redisClient.connect();
};