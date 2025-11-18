import { Router } from "express";
import * as pets from "../services/petsService.js";

const router = Router();

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

// NOTE: POST volontairement absent pour test rouge
export default router;
