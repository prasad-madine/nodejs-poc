import Payment from "../../model/payment";
import { IPayment } from "../../interface/interface";
import { parymentService } from "../../service/parymentService";
import { PAYMENT_MSG } from "../../utils/constants";

jest.mock("../../model/payment");

describe("Payment Service", () => {
  let payment: IPayment = {
    due_date: "2024-11-05",
    expected_amount: 1000,
    outstanding_amount: 500,
    user_id: 1,
    status: "PENDING",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPayment", () => {
    it("should create a new payment successfully", async () => {
      (Payment.create as jest.Mock).mockResolvedValue(payment);

      const result = await parymentService.createPayment(payment);

      expect(Payment.create).toHaveBeenCalledWith(payment);
      expect(result).toEqual(payment);
    });

    it("should throw an error when payment creation fails", async () => {
      const error = new Error("Database error");
      (Payment.create as jest.Mock).mockRejectedValue(error);

      await expect(parymentService.createPayment(payment)).rejects.toThrow(
        PAYMENT_MSG.CREATION_FAILED + error
      );
      expect(Payment.create).toHaveBeenCalledWith(payment);
    });
  });

  describe("getAllPaymentsByUserId", () => {
    it("should return a list of payments for the user", async () => {
      const payments = [payment];
      (Payment.findAll as jest.Mock).mockResolvedValue(payments);

      const result = await parymentService.getAllPaymentsByUserId(1, 1, 2);
      expect(result).toEqual(payments);
    });

    it("should throw an error if fetching payments fails", async () => {
      const error = new Error("Database error");
      (Payment.findAll as jest.Mock).mockRejectedValue(error);

      await expect(
        parymentService.getAllPaymentsByUserId(1, 1, 2)
      ).rejects.toThrow(PAYMENT_MSG.RETRIEVE_FAILED + error);
    });
  });
});
