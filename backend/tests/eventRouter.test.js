import supertest from "supertest";
import { eventRouter } from "../routes/event.router";
import { app } from "../utils/testServer";

app.use("/event", eventRouter);

const req = supertest(app);

describe("Test event.router", () => {
    describe("POST /create", () => {
        test("Expected: 401, User role does not allow this operation", async () => {
            
        })
        
        test("Expected: 500, Internal server error", async () => {
            
        })

        test("Expected: 200, event created", async () => {
            
        })
    });

    describe("PUT /update", () => {
        test("Expected: 500, because of wrong req", async () => {
            
        })
        
        test("Expected: 200, event created", async () => {
            
        })

        test("test", async () => {
            
        })
    });

    describe("DELETE /delete/:id", () => {
        // test("It should delete the event", async () => {
        //     const eventId = "123";
        //     const res = await req.delete(`/event/delete/${eventId}`);

        //     expect(res.status).toBe(200);
        // });

        
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })
    });

    describe("GET /get/all", () => {
        test("test", async () => {
            
        })
        
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })      
    });

    describe("GET /get/mine", () => {
        test("test", async () => {
            
        })
        
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })        
    });

    describe("GET /get/single/:id", () => {
        test("test", async () => {
            
        })
        
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })        
    });

    describe("GET /get/votes/:id", () => {
        test("test", async () => {
            
        })
        
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })        
    });

    describe("GET /get/participations/:id", () => {
        test("test", async () => {
            
        })
        
        test("test", async () => {
            
        })

        test("test", async () => {
            
        })        
    });
});
