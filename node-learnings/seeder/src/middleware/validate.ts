import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { STATUS_CODES } from "../utils/constants";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: error });
    }
  };
