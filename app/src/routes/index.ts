import express from "express";
import { check } from "express-validator";
import { postValidation } from "../middlewares/post-validation";
import { getPosts } from "../controllers/get-posts";
import { createPost } from "../controllers/create-post";
import { deletePost } from "../controllers/delete-post";
import { updatePost } from "../controllers/update-post";
import { getPostByID } from "../controllers/get-post-by-id";

export const router = express.Router();

router.post(
  "/create-post",
  [
    check("title", "Title is required, be fill the field").isLength({
      min: 3,
    }),
    check("description", "Add description to post, please!").notEmpty(),
  ],
  postValidation,
  createPost
);
router.get("/post", getPosts);
router.patch(
  "/update-post/:id",
  [
    check(
      "title",
      "Title is required to update the record, please be fill the field"
    ).isLength({
      min: 3,
    }),
    check("description", "Add and updated description to post").notEmpty(),
  ],
  postValidation,
  updatePost
);
router.get("/post/:id", getPostByID);
router.delete("/post/:id", deletePost);
