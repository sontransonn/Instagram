import express from "express";

import postController from "../controllers/post.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js"
import multerMiddleware from "../middlewares/multer.middleware.js"

const router = express.Router();

router.get("/all", authMiddleware.isAuthenticated, postController.getAllPosts)
router.get("/userpost/all", authMiddleware.isAuthenticated, postController.getUserPost)
router.get("/:id/like", authMiddleware.isAuthenticated, postController.likePost)
router.get("/:id/dislike", authMiddleware.isAuthenticated, postController.dislikePost)
router.get("/:id/bookmark", authMiddleware.isAuthenticated, postController.bookmarkPost)

router.post("/addpost", authMiddleware.isAuthenticated, multerMiddleware.upload.single('image'), postController.addNewPost)
router.post("/:id/comment", authMiddleware.isAuthenticated, postController.addComment)
router.post("/:id/comment/all", authMiddleware.isAuthenticated, postController.getCommentsOfPost)

router.delete("/delete/:id", authMiddleware.isAuthenticated, postController.deletePost)

export default router;