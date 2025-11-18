import { db } from "../store/memory.js";

export function list(limit = 100) {
  return db.pets.slice(0, limit);
}

export function getById(id) {
  return db.pets.find((p) => p.id === id);
}

export function add(pet) {
  if (!pet?.name || !pet?.tag) throw new Error("Invalid pet");
  const id = Math.max(0, ...db.pets.map((p) => p.id)) + 1;
  const newPet = { id, name: pet.name, tag: pet.tag };
  db.pets.push(newPet);
  return newPet;
}
