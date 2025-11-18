import request from "supertest";
import app from "../src/app.js";
import test from 'node:test';
import assert from 'node:assert/strict';

test("Pets API - GET /pets returns array", async (t) => {
  const res = await request(app).get("/pets");
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body), 'response body should be an array');
});

test("Pets API - GET /pets/:id returns 404 when not found", async (t) => {
  const res = await request(app).get("/pets/99999");
  assert.equal(res.status, 404);
});

test("Pets API - POST /pets creates a pet (RED au départ)", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ name: "Buddy", tag: "dog" });
  assert.equal(res.status, 201);
  assert.ok('id' in res.body, 'response should contain id');
});
