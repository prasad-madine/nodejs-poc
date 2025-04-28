import { Request, Response } from "express";
import User from "../models/user";

const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: "An unknown error occurred" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const [affectedRows] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (!affectedRows) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByPk(req.params.id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedCount = await User.destroy({ where: { id: req.params.id } });

    if (!deletedCount) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    handleError(res, error);
  }
};
