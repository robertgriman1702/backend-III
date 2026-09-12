import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { connectTestDB, clearTestDB, disconnectTestDB } from "./setup.js";

describe("Orders — flujo principal", () => {
  let userId, storeId;

  before(connectTestDB);
  after(disconnectTestDB);

  beforeEach(async () => {
    const userRes = await request(app).post("/api/users").send({
      firstName: "Juan",
      lastName: "Pérez",
      email: `juan${Date.now()}@test.com`,
      password: "123456",
      role: "store"
    });
    userId = userRes.body.payload._id;

    const storeRes = await request(app).post("/api/stores").send({
      name: "Kiosco Centro",
      address: "Av. Siempre Viva 742",
      owner: userId
    });
    storeId = storeRes.body.payload._id;
  });

  afterEach(clearTestDB);

  it("crea un pedido y calcula el total correctamente", async () => {
    const res = await request(app).post("/api/orders").send({
      customer: userId,
      store: storeId,
      deliveryAddress: "Av. Siempre Viva 742",
      items: [{ name: "Caja mediana", quantity: 2, price: 1500 }]
    });

    expect(res.status).to.equal(201);
    expect(res.body.payload.total).to.equal(3000);
    expect(res.body.payload.status).to.equal("created");
  });

  it("actualiza el estado de un pedido", async () => {
    const createRes = await request(app).post("/api/orders").send({
      customer: userId,
      store: storeId,
      deliveryAddress: "Av. Siempre Viva 742",
      items: [{ name: "Sobre chico", quantity: 1, price: 800 }]
    });

    const orderId = createRes.body.payload._id;

    const res = await request(app)
      .put(`/api/orders/${orderId}/status`)
      .send({ status: "in_transit" });

    expect(res.status).to.equal(200);
    expect(res.body.payload.status).to.equal("in_transit");
  });

  it("rechaza un estado inválido", async () => {
    const createRes = await request(app).post("/api/orders").send({
      customer: userId,
      store: storeId,
      deliveryAddress: "Av. Siempre Viva 742",
      items: [{ name: "Sobre chico", quantity: 1, price: 800 }]
    });

    const orderId = createRes.body.payload._id;

    const res = await request(app)
      .put(`/api/orders/${orderId}/status`)
      .send({ status: "en_la_luna" });

    expect(res.status).to.equal(400);
  });

  it("crear pedido con customer inexistente devuelve 404", async () => {
    const res = await request(app).post("/api/orders").send({
      customer: "507f1f77bcf86cd799439011",
      store: storeId,
      deliveryAddress: "Av. Siempre Viva 742",
      items: [{ name: "Sobre chico", quantity: 1, price: 800 }]
    });

    expect(res.status).to.equal(404);
  });
});