import { Router } from "express";
import { authenticationController } from "../controller/authenticationController";
import { LOGIN_ROUTE } from "../utils/constants";

const router = Router();
router.route(LOGIN_ROUTE).post(authenticationController.login);

export default router;
