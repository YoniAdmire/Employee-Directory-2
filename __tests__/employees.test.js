// __tests__/employees.test.js
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Employee Directory API", () => {
  it("GET / should return greeting", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello employees!");
  });

  it("GET /employees should return all employees", async () => {
    const res = await request(app).get("/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /employees/random should return a random employee", async () => {
    const res = await request(app).get("/employees/random");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("GET /employees/:id should return the correct employee", async () => {
    const res = await request(app).get("/employees/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("GET /employees/:id should return 404 for non-existing ID", async () => {
    const res = await request(app).get("/employees/9999");
    expect(res.status).toBe(404);
  });

  it("POST /employees should return 400 if no name provided", async () => {
    const res = await request(app).post("/employees").send({});
    expect(res.status).toBe(400);
  });

  it("POST /employees should add a new employee and return 201", async () => {
    const res = await request(app).post("/employees").send({ name: "Dana Scott" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name", "Dana Scott");
    expect(res.body).toHaveProperty("id");
  });
});
