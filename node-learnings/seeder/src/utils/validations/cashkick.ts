import { z } from "zod";
import { VALIDATION_ERRORS } from "../constants";
import { cashkickStatus } from "../enums";

export const createCashkickRequestSchema = z.object({
  name: z.string(),
  maturity: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: VALIDATION_ERRORS.ERROR_INVALID_DUE_DATE,
  }),
  status: z.enum([cashkickStatus.APPROVED, cashkickStatus.PENDING]),
  total_received: z.number().min(0, VALIDATION_ERRORS.ERROR_TERM_LENGTH_NUMBER),
  total_financed: z.number().min(0, VALIDATION_ERRORS.ERROR_TERM_LENGTH_NUMBER),
});
