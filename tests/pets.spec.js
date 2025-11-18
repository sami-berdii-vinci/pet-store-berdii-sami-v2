import request from "supertest";
import app from "../src/app.js";
import test from "node:test";
import assert from "node:assert/strict";

test("Pets API - GET /pets returns array", async (t) => {
  const res = await request(app).get("/pets");
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body), "response body should be an array");
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
  assert.ok("id" in res.body, "response should contain id");
  assert.equal(res.body.name, "Buddy");
  assert.equal(res.body.tag, "dog");
});

test("Pets API - POST /pets returns 400 when name is missing", async (t) => {
  const res = await request(app).post("/pets").send({ tag: "dog" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("name"), "error should mention 'name'");
});

test("Pets API - POST /pets returns 400 when tag is missing", async (t) => {
  const res = await request(app).post("/pets").send({ name: "Buddy" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("tag"), "error should mention 'tag'");
});

test("Pets API - POST /pets returns 400 when name is not a string", async (t) => {
  const res = await request(app).post("/pets").send({ name: 123, tag: "dog" });
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
  assert.ok(
    res.body.message.includes("Additional properties"),
    "error should mention additional properties"
  );
});

test("Pets API - POST /pets returns 400 when name is empty string", async (t) => {
  const res = await request(app).post("/pets").send({ name: "", tag: "dog" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("name"), "error should mention 'name'");
});

test("Pets API - POST /pets returns 400 when tag is empty string", async (t) => {
  const res = await request(app).post("/pets").send({ name: "Buddy", tag: "" });
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("tag"), "error should mention 'tag'");
});

// Pagination tests
test("Pets API - GET /pets?limit=10 returns max 10 pets", async (t) => {
  const res = await request(app).get("/pets?limit=10");
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body), "response body should be an array");
  assert.ok(res.body.length <= 10, "should return at most 10 pets");
});

test("Pets API - GET /pets?limit=5 returns max 5 pets", async (t) => {
  const res = await request(app).get("/pets?limit=5");
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 5, "should return exactly 5 pets");
});

test("Pets API - GET /pets?offset=10 starts from pet at index 10", async (t) => {
  const resAll = await request(app).get("/pets");
  const resOffset = await request(app).get("/pets?offset=10");
  assert.equal(resOffset.status, 200);
  assert.deepEqual(
    resOffset.body[0],
    resAll.body[10],
    "first pet with offset=10 should match pet at index 10"
  );
});

test("Pets API - GET /pets?limit=5&offset=10 returns correct slice", async (t) => {
  const res = await request(app).get("/pets?limit=5&offset=10");
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 5, "should return exactly 5 pets");
  const resAll = await request(app).get("/pets");
  assert.deepEqual(
    res.body,
    resAll.body.slice(10, 15),
    "should return pets from index 10 to 14"
  );
});

test("Pets API - GET /pets?limit=invalid returns 400", async (t) => {
  const res = await request(app).get("/pets?limit=invalid");
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("limit"), "error should mention 'limit'");
});

test("Pets API - GET /pets?limit=0 returns 400", async (t) => {
  const res = await request(app).get("/pets?limit=0");
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("limit"), "error should mention 'limit'");
});

test("Pets API - GET /pets?limit=-5 returns 400", async (t) => {
  const res = await request(app).get("/pets?limit=-5");
  assert.equal(res.status, 400);
  assert.ok(res.body.message.includes("limit"), "error should mention 'limit'");
});

test("Pets API - GET /pets?offset=invalid returns 400", async (t) => {
  const res = await request(app).get("/pets?offset=invalid");
  assert.equal(res.status, 400);
  assert.ok(
    res.body.message.includes("offset"),
    "error should mention 'offset'"
  );
});

test("Pets API - GET /pets?offset=-1 returns 400", async (t) => {
  const res = await request(app).get("/pets?offset=-1");
  assert.equal(res.status, 400);
  assert.ok(
    res.body.message.includes("offset"),
    "error should mention 'offset'"
  );
});

test("Pets API - GET /pets?offset=100 returns empty array when offset exceeds total pets", async (t) => {
  const res = await request(app).get("/pets?offset=100");
  assert.equal(res.status, 200);
  assert.equal(
    res.body.length,
    0,
    "should return empty array when offset exceeds total pets"
  );
});
