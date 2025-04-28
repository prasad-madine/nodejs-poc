import { Request, Response } from "express";
import Post from "../models/post";

const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: "An unknown error occurred" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).json(post);
  } catch (error) {
    handleError(res, error);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    handleError(res, error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!affectedRows) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Post.findByPk(req.params.id);
    return res.status(200).json(updatedPost);
  } catch (error) {
    handleError(res, error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const deletedCount = await Post.destroy({ where: { id: req.params.id } });

    if (!deletedCount) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    handleError(res, error);
  }
};

export const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.params.userId } });
    return res.status(200).json({
      userId: req.params.userId,
      posts,
    });
  } catch (error) {
    handleError(res, error);
  }
};
