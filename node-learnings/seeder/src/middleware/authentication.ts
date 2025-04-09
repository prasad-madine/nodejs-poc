import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/constants";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Access denied. No token provided." });
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || "secretkey",
    (err: any, user: any) => {
      if (err) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ message: "Invalid token" });
      }
      next();
    }
  );
};
