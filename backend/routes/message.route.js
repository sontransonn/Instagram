import express from "express";

import messageController from "../controllers/message.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js"
import multerMiddleware from "../middlewares/multer.middleware.js"

const router = express.Router();

router.get("/all/:id", authMiddleware.isAuthenticated, messageController.getMessage)

router.post("/send/:id", authMiddleware.isAuthenticated, messageController.getMessage)

export default router;