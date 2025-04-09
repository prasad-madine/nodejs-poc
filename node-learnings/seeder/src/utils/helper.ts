import { Response } from "express";
import bcrypt from "bcrypt";

export const sendResponse = (res: Response, statusCode: number, json: any) => {
  return res.status(statusCode).json(json);
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const generatedSalt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, generatedSalt);
  return hashedPassword;
};
