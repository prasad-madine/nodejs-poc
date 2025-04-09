import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/helper";
import { cashkickService } from "../service/cashkickService";
import { CASHKICK_MSG, INVALID_ID, STATUS_CODES } from "../utils/constants";

export const cashkickController = {
  createCashkick: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        status,
        maturity,
        total_financed,
        total_received,
        user_id,
        contract_Ids,
      } = req.body;
      if (!Array.isArray(contract_Ids) || contract_Ids.length === 0) {
        return sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: CASHKICK_MSG.ID_REQUIRED,
        });
      }
      const newCashkick = await cashkickService.createCashkick(
        { name, status, maturity, total_financed, total_received, user_id },
        contract_Ids
      );
      sendResponse(res, STATUS_CODES.CREATED, {
        cashkick: newCashkick,
        message: CASHKICK_MSG.CREATION_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  },
  getCashkickByUserId: async (
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
      const cashkicks = await cashkickService.getCashkickByUserId(
        userId,
        page,
        limit
      );
      if (!cashkicks.length) {
        return sendResponse(res, STATUS_CODES.NOT_FOUND, {
          message: CASHKICK_MSG.NOT_FOUND,
        });
      }
      sendResponse(res, STATUS_CODES.SUCCESS, {
        cashkicks: cashkicks,
        message: CASHKICK_MSG.RETRIEVE_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  },
};
