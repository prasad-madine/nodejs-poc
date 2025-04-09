import { contractService } from "../../service/contractService";
import Contract from "../../model/contract";
import { IContract } from "../../interface/interface";
import { CONTRACT_MSG } from "../../utils/constants";

jest.mock("../../model/contract");

describe("Contract Service", () => {
  let contract: IContract = {
    name: "contract 1",
    type: "MONTHLY",
    interest: 12,
    per_payment: 888585,
    payment_amount: 677855,
    term_length: 12,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllContracts", () => {
    it("should return a list of all contracts", async () => {
      const contracts = [contract];
      (Contract.findAll as jest.Mock).mockResolvedValue(contracts);

      const result = await contractService.getAllContracts(1, 2);

      expect(Contract.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(contracts);
    });

    it("should throw an error if fetching contracts fails", async () => {
      const error = new Error("Database error");
      (Contract.findAll as jest.Mock).mockRejectedValue(error);

      await expect(contractService.getAllContracts(1, 2)).rejects.toThrow(
        CONTRACT_MSG.RETRIEVE_FAILED + error
      );
      expect(Contract.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("createContract", () => {
    it("should create a new contract successfully", async () => {
      (Contract.create as jest.Mock).mockResolvedValue(contract);

      const result = await contractService.createContract(contract);

      expect(Contract.create).toHaveBeenCalledWith(contract);
      expect(result).toEqual(contract);
    });

    it("should throw an error if contract creation fails", async () => {
      const error = new Error("Database error");
      (Contract.create as jest.Mock).mockRejectedValue(error);

      await expect(contractService.createContract(contract)).rejects.toThrow(
        CONTRACT_MSG.CREATION_FAILED + error
      );
      expect(Contract.create).toHaveBeenCalledWith(contract);
    });
  });
});
