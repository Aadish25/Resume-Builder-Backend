import express from "express";
import signup from "../controllers/Authentication/signup/controllers.js";
import login from "../controllers/Authentication/login/controllers.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);

export default router;
