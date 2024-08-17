import express from "express";

import userController from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import multerMiddleware from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/:id/profile", authMiddleware.isAuthenticated, userController.getProfile)
router.get("/suggested", authMiddleware.isAuthenticated, userController.getSuggestedUsers)

router.post("/profile/edit", authMiddleware.isAuthenticated, multerMiddleware.upload.single('profilePhoto'), userController.editProfile)
router.post("/followorunfollow/:id", authMiddleware.isAuthenticated, userController.followOrUnfollow)

export default router;