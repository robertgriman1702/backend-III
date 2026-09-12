import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Mocks", () => {
  it("GET /api/mocks/users?count=3 devuelve 3 usuarios falsos", async () => {
    const res = await request(app).get("/api/mocks/users?count=3");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.lengthOf(3);
  });

  it("GET /api/mocks/users con count inválido devuelve 400", async () => {
    const res = await request(app).get("/api/mocks/users?count=-1");
    expect(res.status).to.equal(400);
  });
});