import { Router } from "express";
import { userController } from "../controller/userController";
import { BY_USER_ID_ROUTE, REGISTER_ROUTE } from "../utils/constants";
import { authenticateToken } from "../middleware/authentication";
import { validate } from "../middleware/validate";
import {
  createUserRequestSchema,
  updateUserRequestSchema,
} from "../utils/validations/user";

const router = Router();

router
  .route(BY_USER_ID_ROUTE)
  .get(authenticateToken, userController.getUserById);

router
  .route(BY_USER_ID_ROUTE)
  .patch(
    validate(updateUserRequestSchema),
    authenticateToken,
    userController.updateUser
  );

router
  .route(REGISTER_ROUTE)
  .post(validate(createUserRequestSchema), userController.createUser);

export default router;
