import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI, PORT } from "./config.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/users", userRoutes);

// conectar mongo
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado correctamente");
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error conectando MongoDB:", err));
