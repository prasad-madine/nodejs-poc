import { ICashkick } from "../interface/interface";
import Cashkick from "../model/cashkick";
import CashkickContract from "../model/cashkick_contract";
import { CASHKICK_MSG } from "../utils/constants";

export const cashkickService = {
  createCashkick: async (cashkick: ICashkick, contractIds: number[]) => {
    try {
      const newCashkick = await Cashkick.create({ ...cashkick });

      const contractCashkick = contractIds.map((contractId) =>
        CashkickContract.create({
          contract_id: contractId,
          cashkick_id: newCashkick.id,
        })
      );
      await Promise.all(contractCashkick);
      return newCashkick;
    } catch (error) {
      throw new Error(CASHKICK_MSG.CREATION_FAILED + error);
    }
  },
  getCashkickByUserId: async (userId: number, page: number, limit: number) => {
    try {
      const offset = (page - 1) * limit;
      const cashkicks = await Cashkick.findAll({
        where: { user_id: userId },
        offset,
        limit,
      });
      return cashkicks;
    } catch (error) {
      throw new Error(CASHKICK_MSG.RETRIEVE_FAILED + error);
    }
  },
};
