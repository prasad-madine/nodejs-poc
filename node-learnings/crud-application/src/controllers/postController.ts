import { Request, Response } from "express";
import Post from "../models/post";

// Utility to handle errors
const handleError = (res: Response, error: unknown) => {
  const message = error instanceof Error ? error.message : "An unknown error occurred";
  res.status(400).json({ error: message });
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    handleError(res, error);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    handleError(res, error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const [updated] = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) return res.status(404).json({ message: "Post not found" });

    const updatedPost = await Post.findByPk(req.params.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    handleError(res, error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const deleted = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) return res.status(404).json({ message: "Post not found" });

    res.status(204).send(); // No Content - cleaner
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    handleError(res, error);
  }
};

export const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.params.userId },
    });

    res.status(200).json({
      userId: req.params.userId,
      posts,
    });
  } catch (error) {
    handleError(res, error);
  }
};
