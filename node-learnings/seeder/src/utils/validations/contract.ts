import { z } from "zod";
import { VALIDATION_ERRORS } from "../constants";
import { contractType } from "../enums";

export const createContractRequestSchema = z.object({
  name: z.string().trim().min(3, VALIDATION_ERRORS.ERROR_NAME_REQUIRED),

  type: z.enum([
    contractType.MONTHLY,
    contractType.QUERTERLY,
    contractType.YEARLY,
  ]),

  interest: z.number().min(0, VALIDATION_ERRORS.ERROR_TERM_LENGTH_NUMBER),

  per_payment: z.number().min(0, VALIDATION_ERRORS.ERROR_TERM_LENGTH_NUMBER),

  payment_amount: z.number().min(0, VALIDATION_ERRORS.ERROR_TERM_LENGTH_NUMBER),

  term_length: z
    .number()
    .int()
    .min(0, VALIDATION_ERRORS.ERROR_TERM_LENGTH_NUMBER),
});
