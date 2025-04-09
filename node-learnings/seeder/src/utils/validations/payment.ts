import { z } from "zod";
import { VALIDATION_ERRORS } from "../constants";

export const createPaymentRequestSchema = z.object({
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: VALIDATION_ERRORS.ERROR_INVALID_DUE_DATE,
  }),

  expected_amount: z.number().min(0),

  outstanding_amount: z.number().min(0),
});
