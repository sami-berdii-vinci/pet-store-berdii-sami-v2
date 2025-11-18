import express from "express";
import petsRouter from "./routes/pets.js";

const app = express();
app.use(express.json());

app.use("/pets", petsRouter);

export default app;
