import { IPayment } from "../interface/interface";
import Payment from "../model/payment";
import { PAYMENT_MSG } from "../utils/constants";

export const parymentService = {
  createPayment: async (payment: IPayment) => {
    try {
      const newPayment = await Payment.create({ ...payment });
      return newPayment;
    } catch (error) {
      throw new Error(PAYMENT_MSG.CREATION_FAILED + error);
    }
  },
  getAllPaymentsByUserId: async (
    user_id: number,
    page: number,
    limit: number
  ) => {
    try {
      const offset = (page - 1) * limit;
      const payments = await Payment.findAll({
        where: { user_id: user_id },
        offset,
        limit,
      });
      return payments;
    } catch (error) {
      throw new Error(PAYMENT_MSG.RETRIEVE_FAILED + error);
    }
  },
};
