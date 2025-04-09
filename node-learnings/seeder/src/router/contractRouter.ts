import { Router } from "express";
import { contractController } from "../controller/contractController";
import { GET_ALL_ROUTE } from "../utils/constants";
import { authenticateToken } from "../middleware/authentication";
import { validate } from "../middleware/validate";
import { createContractRequestSchema } from "../utils/validations/contract";

const router = Router();

router
  .route(GET_ALL_ROUTE)
  .get(authenticateToken, contractController.getAllContracts);
router
  .route(GET_ALL_ROUTE)
  .post(
    validate(createContractRequestSchema),
    authenticateToken,
    contractController.createContract
  );

export default router;
