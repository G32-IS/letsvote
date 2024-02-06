import supertest from "supertest";
import { requestRouter } from "../routes/request.router";
import { app } from "../utils/testServer";

app.use("/request", requestRouter);

const req = supertest(app);

describe("Test request.router (/request)", () => {
    describe("POST /create", () => {
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })

        test("test", async () => {
            
        })
    })

    describe("PUT /handle", () => {
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })

        test("test", async () => {
            
        })
    })

    describe("GET /get/all", () => {
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })

        test("test", async () => {
            
        })
    })

    describe("GET /get/single/:id", () => {
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })

        test("test", async () => {
            
        })
    })
});
