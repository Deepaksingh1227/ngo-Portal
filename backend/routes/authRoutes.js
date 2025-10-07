import express from "express";
import { register, login } from "../controllers/authController.js";



router.post("/register", register); // NEW
router.post("/login", login);

export default router;
