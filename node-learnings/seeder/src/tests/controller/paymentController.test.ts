import { Request, Response, NextFunction } from "express";
import { parymentService } from "../../service/parymentService";
import { sendResponse } from "../../utils/helper";
import { INVALID_ID, PAYMENT_MSG, STATUS_CODES } from "../../utils/constants";
import { paymentController } from "../../controller/paymentController";

jest.mock("../../service/parymentService");
jest.mock("../../utils/helper");

describe("Payment Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        due_date: "2024-11-05",
        expected_amount: 1000,
        outstanding_amount: 500,
        user_id: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  describe("create payment", () => {
    it("should create payment and give success response", async () => {
      req.body = {
        due_date: "2024-11-05",
        expected_amount: 1000,
        outstanding_amount: 500,
        user_id: 1,
      };
      const createdPayment = { id: "1", ...req.body };
      (parymentService.createPayment as jest.Mock).mockResolvedValue(
        createdPayment
      );
      await paymentController.createPayment(
        req as Request,
        res as Response,
        next
      );
      expect(parymentService.createPayment).toHaveBeenCalledWith(req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.CREATED, {
        message: PAYMENT_MSG.CREATION_SUCCESS,
        payment: createdPayment,
      });
    });
    it("should handle errors when creating payment", async () => {
      const error = new Error("Service error");
      req.body = {
        due_date: "2024-11-05",
        expected_amount: 1000,
        outstanding_amount: 500,
        user_id: 1,
      };
      (parymentService.createPayment as jest.Mock).mockRejectedValue(error);

      await paymentController.createPayment(
        req as Request,
        res as Response,
        next
      );
      expect(next).toHaveBeenCalledWith(error);
      //   expect(sendResponse).not.toHaveBeenCalled();
    });
  });
  describe("get all payments by userId", () => {
    it("should return all payments belongs to particular user", async () => {
      req.params = { userId: "1" };
      req.query = { page: "1", limit: "2" };
      const payments = [
        {
          id: "1",
          due_date: "2024-11-05",
          expected_amount: 1000,
          outstanding_amount: 500,
          user_id: 1,
        },
        {
          id: "2",
          due_date: "2024-12-05",
          expected_amount: 2000,
          outstanding_amount: 1000,
          user_id: 1,
        },
      ];
      (parymentService.getAllPaymentsByUserId as jest.Mock).mockResolvedValue(
        payments
      );

      await paymentController.getAllPaymentsByUserId(
        req as Request,
        res as Response,
        next
      );
      expect(parymentService.getAllPaymentsByUserId).toHaveBeenCalledWith(
        1,
        1,
        2
      );
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        message: PAYMENT_MSG.RETRIEVE_SUCCESS,
        payments,
      });
    });
    it("should handle errors while retrieving payments", async () => {
      const error = new Error("Service error");
      req.params = { userId: "1" };
      req.query = { page: "1", limit: "2" };
      (parymentService.getAllPaymentsByUserId as jest.Mock).mockRejectedValue(
        error
      );
      await paymentController.getAllPaymentsByUserId(
        req as Request,
        res as Response,
        next
      );
      expect(next).toHaveBeenCalledWith(error);
    });
    it("should return 400 for invalid user_id", async () => {
      req.params = { userId: "invalid" };
      req.query = { page: "1", limit: "2" };
      await paymentController.getAllPaymentsByUserId(
        req as Request,
        res as Response,
        next
      );

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: INVALID_ID,
      });
      expect(parymentService.getAllPaymentsByUserId).not.toHaveBeenCalledWith(
        1,
        2
      );
    });
  });
});
