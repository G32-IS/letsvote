import { createClient } from "redis";

export const redisClient = createClient({
    url: `redis://redis:${process.env.REDIS_PORT || 6379}`
});

export const setupRedis = () => {
    console.log("Setting up redis...");
    redisClient.on("error", (err: any) => console.error(err.message));
    redisClient.connect();
};