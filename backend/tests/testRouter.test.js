import supertest from "supertest";
import { testRouter } from "../routes/test.router";

describe("test test.router", () => {
    test("GET /test/", (done) => {
        supertest(testRouter)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
    test("GET /test/userCount", (done) => {
        supertest(testRouter)
            .get("/userCount")
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
