import mongoose from "mongoose";
import express from "express";
import routes from "../core/routes/routes.js";
import databaseConnect from "../core/database/db.js";
import cors from "cors";

const app = express();
app.use(express.json());

// Define the allowed origins
const allowedOrigins = ["http://localhost:5173", "https://careercanvas-aj.vercel.app","https://career--canvas.vercel.app/"];

app.use(cors({ origin: allowedOrigins }));
app.get("/", (request, response) => {
  response.json({ message: "Hello!!" });
});
const PORT = process.env.PORT || 3000;
app.use("/", routes);
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
