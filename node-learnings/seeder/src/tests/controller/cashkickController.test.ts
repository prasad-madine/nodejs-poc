import { Request, Response, NextFunction } from "express";
import { cashkickService } from "../../service/cashkickService";
import { sendResponse } from "../../utils/helper";

import { cashkickController } from "../../controller/cashkickController";
import { CASHKICK_MSG, INVALID_ID, STATUS_CODES } from "../../utils/constants";

jest.mock("../../service/cashkickService");
jest.mock("../../utils/helper");

describe("Cashkick Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCashkick", () => {
    it("should create cashkick and return success response", async () => {
      req.body = {
        name: "Test Cashkick",
        status: "active",
        maturity: "2024-09-09",
        total_received: 5000,
        total_financed: 10000,
        user_id: 1,
        contract_Ids: [1, 2],
      };
      const newCashkick = { id: 1, ...req.body };
      (cashkickService.createCashkick as jest.Mock).mockResolvedValue(
        newCashkick
      );

      await cashkickController.createCashkick(
        req as Request,
        res as Response,
        next
      );

      expect(cashkickService.createCashkick).toHaveBeenCalledWith(
        {
          name: req.body.name,
          status: req.body.status,
          maturity: req.body.maturity,
          total_received: req.body.total_received,
          total_financed: req.body.total_financed,
          user_id: req.body.user_id,
        },
        req.body.contract_Ids
      );
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.CREATED, {
        message: CASHKICK_MSG.CREATION_SUCCESS,
        cashkick: newCashkick,
      });
    });
    it("should return 400 if contract_Ids is not provided", async () => {
      req.body = {
        name: "cashkick 2",
        maturity: "2024-09-09",
        status: "PENDING",
        total_received: 234322,
        total_financed: 234322,
        user_id: 2,
        contract_Ids: [],
      };

      await cashkickController.createCashkick(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: CASHKICK_MSG.ID_REQUIRED,
      });
      expect(cashkickService.createCashkick).not.toHaveBeenCalled();
    });

    it("should handle errors when creating cashkick", async () => {
      const error = new Error("Service Error");
      req.body = {
        name: "Test Cashkick",
        status: "PENDING",
        maturity: "2024-09-09",
        total_received: 5000,
        total_financed: 10000,
        user_id: 1,
        contract_Ids: [1, 2],
      };
      (cashkickService.createCashkick as jest.Mock).mockRejectedValue(error);

      await cashkickController.createCashkick(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });

  describe("getCashkickByUserId", () => {
    it("should return 400 if userId is invalid", async () => {
      req.params = { userId: "invalid" };
      await cashkickController.getCashkickByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: INVALID_ID,
      });
      expect(cashkickService.getCashkickByUserId).not.toHaveBeenCalled();
    });

    it("should return 404 if no cashkicks are found", async () => {
      req.params = { userId: "1" };
      req.query = { page: "1", limit: "2" };
      (cashkickService.getCashkickByUserId as jest.Mock).mockResolvedValue([]);

      await cashkickController.getCashkickByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.NOT_FOUND, {
        message: CASHKICK_MSG.NOT_FOUND,
      });
    });

    it("should return all cashkicks for a valid user", async () => {
      req.params = { userId: "1" };
      req.query = { page: "1", limit: "2" };
      const cashkicks = [
        {
          id: 1,
          name: "Test Cashkick",
          status: "PENDING",
          maturity: "2024-09-09",
          total_received: 5000,
          total_financed: 10000,
        },
        {
          id: 2,
          name: "Cashkick 2",
          status: "PENDING",
          maturity: "2024-09-09",
          total_received: 5000,
          total_financed: 10000,
        },
      ];
      (cashkickService.getCashkickByUserId as jest.Mock).mockResolvedValue(
        cashkicks
      );

      await cashkickController.getCashkickByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(cashkickService.getCashkickByUserId).toHaveBeenCalledWith(1, 1, 2);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        cashkicks: cashkicks,
        message: CASHKICK_MSG.RETRIEVE_SUCCESS,
      });
    });

    it("should handle errors when fetching cashkicks", async () => {
      const error = new Error("Service Error");
      req.params = { userId: "1" };
      req.query = { page: "1", limit: "3" };
      (cashkickService.getCashkickByUserId as jest.Mock).mockRejectedValue(
        error
      );

      await cashkickController.getCashkickByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
});
