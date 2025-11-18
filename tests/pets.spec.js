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

test("Pets API - POST /pets creates a pet", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ name: "Buddy", tag: "dog" });
  assert.equal(res.status, 201);
  assert.ok('id' in res.body, 'response should contain id');
  assert.equal(res.body.name, "Buddy");
  assert.equal(res.body.tag, "dog");
});

test("Pets API - POST /pets returns 400 when name is missing", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ tag: "dog" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("name"), "error should mention 'name'");
});

test("Pets API - POST /pets returns 400 when tag is missing", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ name: "Buddy" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("tag"), "error should mention 'tag'");
});

test("Pets API - POST /pets returns 400 when name is not a string", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ name: 123, tag: "dog" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("name"), "error should mention 'name'");
});

test("Pets API - POST /pets returns 400 when tag is not a string", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ name: "Buddy", tag: false });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("tag"), "error should mention 'tag'");
});

test("Pets API - POST /pets returns 400 when additional properties are provided", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ name: "Buddy", tag: "dog", extra: "field" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("Additional properties"), "error should mention additional properties");
});

test("Pets API - POST /pets returns 400 when name is empty string", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ name: "", tag: "dog" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("name"), "error should mention 'name'");
});

test("Pets API - POST /pets returns 400 when tag is empty string", async (t) => {
  const res = await request(app)
    .post("/pets")
    .send({ name: "Buddy", tag: "" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("tag"), "error should mention 'tag'");
});