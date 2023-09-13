import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const input = {
      name: "Product A",
      price: 100
    }

    const response = await request(app)
      .post("/product")
      .send(input);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it("Should not create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({});
    expect(response.status).toBe(500);
  });

  it("Should list all products", async () => {
    const [ inputProductA, inputProductB ] = [
      {
        name: "Product A",
        price: 100,
      },
      {
        name: "Product B",
        price: 200,
      }
    ]

    const [ response1, response2 ] = await Promise.all([
      request(app).post("/product").send(inputProductA),
      request(app).post("/product").send(inputProductB)
    ]);

    expect(response1.status).toBe(201);
    expect(response2.status).toBe(201);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    expect(listResponse.body.products[0]).toEqual({
      id: expect.any(String),
      name: inputProductA.name,
      price: inputProductA.price
    });

    expect(listResponse.body.products[1]).toEqual({
      id: expect.any(String),
      name: inputProductB.name,
      price: inputProductB.price
    });
  });
});
