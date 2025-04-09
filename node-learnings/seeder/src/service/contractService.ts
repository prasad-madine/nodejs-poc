import { IContract } from "../interface/interface";
import Contract from "../model/contract";
import { CONTRACT_MSG } from "../utils/constants";

export const contractService = {
  getAllContracts: async (page: number, limit: number) => {
    try {
      const offset = (page - 1) * limit;
      const contracts = await Contract.findAll({ offset, limit });
      return contracts;
    } catch (error) {
      throw new Error(CONTRACT_MSG.RETRIEVE_FAILED + error);
    }
  },
  createContract: async (contract: IContract) => {
    try {
      const newContract = await Contract.create({ ...contract });
      return newContract;
    } catch (error) {
      throw new Error(CONTRACT_MSG.CREATION_FAILED + error);
    }
  },
};
