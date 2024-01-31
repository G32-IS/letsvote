const request = require("supertest");
import { testRouter } from "../routes/test.router";

describe("test test.router", () => {
    test("GET /test/userCount", (done) => {
        request(testRouter)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                typeof res.body.count === "number";
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});
