import { Router } from "express";
import * as pets from "../services/petsService.js";

const router = Router();

// Validation function for NewPet schema
function validateNewPet(body) {
  // Check for required fields
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be a JSON object");
  }
  
  if (typeof body.name !== "string" || body.name.trim() === "") {
    throw new Error("Field 'name' is required and must be a non-empty string");
  }
  
  if (typeof body.tag !== "string" || body.tag.trim() === "") {
    throw new Error("Field 'tag' is required and must be a non-empty string");
  }
  
  // Check for additional properties (additionalProperties: false)
  const allowedKeys = ["name", "tag"];
  const extraKeys = Object.keys(body).filter(key => !allowedKeys.includes(key));
  if (extraKeys.length > 0) {
    throw new Error(`Additional properties not allowed: ${extraKeys.join(", ")}`);
  }
}

// GET /pets?limit=
router.get("/", (req, res) => {
  const limit = Number(req.query.limit ?? 100);
  const data = pets.list(limit);
  res.json(data);
});

// GET /pets/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const pet = pets.getById(id);
  if (!pet) return res.status(404).json({ message: "Not found" });
  res.json(pet);
});

// POST /pets
router.post("/", (req, res) => {
  try {
    validateNewPet(req.body);
    const pet = pets.add(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;