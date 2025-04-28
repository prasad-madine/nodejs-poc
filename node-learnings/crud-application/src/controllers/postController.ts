import { Request, Response } from "express";
import Post from "../models/post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const [updated] = await Post.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPost = await Post.findByPk(req.params.id);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const deleted = await Post.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.params.userId } });
    res.status(200).json({
      userId: req.params.userId,
      posts: [...posts],
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
