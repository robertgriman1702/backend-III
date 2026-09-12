import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { connectTestDB, clearTestDB, disconnectTestDB } from "./setup.js";

describe("Users", () => {
  before(connectTestDB);
  afterEach(clearTestDB);
  after(disconnectTestDB);

  it("POST /api/users crea un usuario", async () => {
    const res = await request(app).post("/api/users").send({
      firstName: "Martina",
      lastName: "Gómez",
      email: "martina@test.com",
      password: "123456",
      role: "customer"
    });

    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("_id");
  });

  it("POST /api/users sin datos obligatorios devuelve 400", async () => {
    const res = await request(app).post("/api/users").send({ firstName: "Martina" });
    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal("error");
  });

  it("GET /api/users/:uid con id inexistente devuelve 404", async () => {
    const res = await request(app).get("/api/users/507f1f77bcf86cd799439011");
    expect(res.status).to.equal(404);
  });
});