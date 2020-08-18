const app = require("../app");
const supertest = require("supertest");

describe("plain text response", () => {

  it("returns a plain text response", (done) => {
    supertest(app)
        .get("/")
        .set("User-Agent", "my cool browser")
        .set("Accept", "text/plain")
        .expect("Content-Type", /text\/plain/)
        .expect(200)
        .end(done);
  });

  it("returns your User Agent", (done) => {
    supertest(app)
        .get("/")
        .set("User-Agent", "my cool browser")
        .set("Accept", "text/plain")
        .expect(res => {
          if (res.text !== "my cool browser") {
            
          }
        })
        .end(done);
  });

});
