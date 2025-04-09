import { Router } from "express";
import { cashkickController } from "../controller/cashkickController";
import { BY_USER_ID_ROUTE, GET_ALL_ROUTE } from "../utils/constants";
import { authenticateToken } from "../middleware/authentication";
import { validate } from "../middleware/validate";
import { createCashkickRequestSchema } from "../utils/validations/cashkick";

const router = Router();

router
  .route(GET_ALL_ROUTE)
  .post(
    validate(createCashkickRequestSchema),
    authenticateToken,
    cashkickController.createCashkick
  );
router
  .route(BY_USER_ID_ROUTE)
  .get(authenticateToken, cashkickController.getCashkickByUserId);

export default router;
