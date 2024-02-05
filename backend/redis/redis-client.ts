import { createClient } from "redis";

export const redisClient = createClient({
    url: 'redis://redis:6379'
});

export const setupRedis = () => {
    console.log("Setting up redis...");
    console.log(redisClient);
    redisClient.on("error", (err: any) => console.error(err.message));
    redisClient.connect();
};