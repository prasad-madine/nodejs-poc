import { Request, Response, NextFunction } from "express";
import { contractService } from "../service/contractService";
import { sendResponse } from "../utils/helper";
import { CONTRACT_MSG, STATUS_CODES } from "../utils/constants";

export const contractController = {
  getAllContracts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 10;
      const contracts = await contractService.getAllContracts(page, limit);
      sendResponse(res, STATUS_CODES.SUCCESS, {
        contracts,
        message: CONTRACT_MSG.RETRIEVE_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  },
  createContract: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, type, interest, per_payment, payment_amount, term_length } =
        req.body;
      const contract = await contractService.createContract({
        name,
        type,
        interest,
        per_payment,
        payment_amount,
        term_length,
      });
      sendResponse(res, STATUS_CODES.CREATED, {
        contract,
        message: CONTRACT_MSG.CREATION_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  },
};
