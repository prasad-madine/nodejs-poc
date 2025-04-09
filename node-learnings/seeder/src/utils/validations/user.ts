import { z } from "zod";
import { VALIDATION_ERRORS } from "../constants";

const createUserRequestSchema = z.object({
  name: z.string().trim().min(3, VALIDATION_ERRORS.ERROR_NAME_REQUIRED),
  email: z.string().trim().email(VALIDATION_ERRORS.ERROR_INVALID_EMAIL),
  password: z
    .string()
    .trim()
    .refine((password) => VALIDATION_ERRORS.PASSWORD_REGEX.test(password), {
      message: VALIDATION_ERRORS.ERROR_PASSWORD_REQUIREMENTS,
    }),
  available_credit: z
    .number()
    .int()
    .min(0, VALIDATION_ERRORS.ERROR_CASH_KICK_AMOUNT),
});

const updateUserRequestSchema = z.object({
  password: z
    .string()
    .trim()
    .optional()
    .refine(
      (password) =>
        !password || VALIDATION_ERRORS.PASSWORD_REGEX.test(password),
      {
        message: VALIDATION_ERRORS.ERROR_PASSWORD_REQUIREMENTS,
      }
    ),
  available_credit: z
    .number()
    .int()
    .min(0, VALIDATION_ERRORS.ERROR_CASH_KICK_AMOUNT),
});

export { createUserRequestSchema, updateUserRequestSchema };
