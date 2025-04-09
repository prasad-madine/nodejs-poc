import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/helper";
import { STATUS_CODES } from "../utils/constants";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendResponse(res, STATUS_CODES.SERVER_ERROR, {
    message: error.message || "Internal server error",
  });
};
