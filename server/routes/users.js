import express from "express";
const router = express.Router();

import { signin, signup, forgotPassword } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);

export default router;