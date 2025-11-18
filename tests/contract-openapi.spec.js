import request from "supertest";
import app from "../src/app.js";
import test from 'node:test';
import assert from 'node:assert/strict';

test("Contract sanity - GET /pets returns objects with id, name, tag", async (t) => {
  const res = await request(app).get("/pets");
  assert.equal(res.status, 200);
  const first = res.body[0];
  assert.ok('id' in first, 'object should have id property');
  assert.ok('name' in first, 'object should have name property');
  assert.ok('tag' in first, 'object should have tag property');
});
