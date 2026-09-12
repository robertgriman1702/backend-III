import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Health & Swagger", () => {
  it("GET /health responde success", async () => {
    const res = await request(app).get("/health");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
  });

  it("GET /api/docs responde 200", async () => {
    const res = await request(app).get("/api/docs/");
    expect(res.status).to.equal(200);
  });

  it("GET /ruta-inexistente responde 404", async () => {
    const res = await request(app).get("/ruta-inexistente");
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal("error");
  });
});