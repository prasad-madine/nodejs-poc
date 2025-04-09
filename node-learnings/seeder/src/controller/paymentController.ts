import { Request, Response, NextFunction } from "express";
import { parymentService } from "../service/parymentService";
import { sendResponse } from "../utils/helper";
import { INVALID_ID, PAYMENT_MSG, STATUS_CODES } from "../utils/constants";

export const paymentController = {
  createPayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, due_date, expected_amount, outstanding_amount, user_id } =
        req.body;
      const newPayment = await parymentService.createPayment({
        status,
        due_date,
        expected_amount,
        outstanding_amount,
        user_id,
      });
      sendResponse(res, STATUS_CODES.CREATED, {
        payment: newPayment,
        message: PAYMENT_MSG.CREATION_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllPaymentsByUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = parseInt(req.params.userId);
      if (isNaN(userId)) {
        sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: INVALID_ID,
        });
        return;
      }
      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 10;
      const payments = await parymentService.getAllPaymentsByUserId(
        userId,
        page,
        limit
      );
      sendResponse(res, STATUS_CODES.SUCCESS, {
        payments: payments,
        message: PAYMENT_MSG.RETRIEVE_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  },
};
