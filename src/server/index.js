import mongoose from "mongoose";
import express, { response } from "express";
import routes from "../core/routes/routes.js";
import databaseConnect from "../core/database/db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://resume-builder-backend-ten.vercel.app/" }));
app.get("/", (request, response) => {
  response.json({ message: "Hello!!" });
});
const PORT = process.env.PORT || 3000;
app.use("/", routes);
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
