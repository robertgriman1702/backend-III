import { expect } from "chai";
import request from "supertest";
import path from "path";
import app from "../src/app.js";
import { connectTestDB, clearTestDB, disconnectTestDB } from "./setup.js";

const fixturesPath = path.resolve("test/fixtures");

describe("Upload de archivos", () => {
  let userId;

  before(connectTestDB);
  after(disconnectTestDB);

  beforeEach(async () => {
    const userRes = await request(app).post("/api/users").send({
      firstName: "Ana",
      lastName: "Ruiz",
      email: `ana${Date.now()}@test.com`,
      password: "123456",
      role: "customer"
    });
    userId = userRes.body.payload._id;
  });

  afterEach(clearTestDB);

  it("sube un documento válido para un usuario", async () => {
    const res = await request(app)
      .post(`/api/users/${userId}/documents`)
      .attach("document", path.join(fixturesPath, "sample.pdf"));

    expect(res.status).to.equal(200);
    expect(res.body.payload.documents).to.have.lengthOf(1);
  });

  it("rechaza un tipo de archivo inválido", async () => {
    const res = await request(app)
      .post(`/api/users/${userId}/documents`)
      .attach("document", path.join(fixturesPath, "sample.txt"));

    expect(res.status).to.equal(400);
  });

  it("rechaza si no se adjunta archivo", async () => {
    const res = await request(app).post(`/api/users/${userId}/documents`);
    expect(res.status).to.equal(400);
  });
});