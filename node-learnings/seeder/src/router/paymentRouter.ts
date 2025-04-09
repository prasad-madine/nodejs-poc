import { Router } from "express";
import { paymentController } from "../controller/paymentController";
import { BY_USER_ID_ROUTE, GET_ALL_ROUTE } from "../utils/constants";
import { authenticateToken } from "../middleware/authentication";
import { validate } from "../middleware/validate";
import { createPaymentRequestSchema } from "../utils/validations/payment";

const router = Router();

router
  .route(GET_ALL_ROUTE)
  .post(
    validate(createPaymentRequestSchema),
    authenticateToken,
    paymentController.createPayment
  );
router
  .route(BY_USER_ID_ROUTE)
  .get(authenticateToken, paymentController.getAllPaymentsByUserId);

export default router;
