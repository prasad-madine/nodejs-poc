import { cashkickService } from "../../service/cashkickService";
import Cashkick from "../../model/cashkick";
import CashkickContract from "../../model/cashkick_contract";
import { ICashkick } from "../../interface/interface";
import { CASHKICK_MSG } from "../../utils/constants";

jest.mock("../../model/cashkick");
jest.mock("../../model/cashkick_contract");

describe("Cashkick Service", () => {
  let cashkick: ICashkick = {
    name: "Test Cashkick",
    status: "PENDING",
    maturity: "2024-09-09",
    total_received: 5000,
    total_financed: 10000,
    user_id: 1,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createCashkick", () => {
    const contractIds = [1, 2, 3];

    it("should create a new cashkick and associate contracts", async () => {
      const newCashkick = { ...cashkick, id: 1 };
      (Cashkick.create as jest.Mock).mockResolvedValue(newCashkick);
      (CashkickContract.create as jest.Mock).mockResolvedValue({});

      const result = await cashkickService.createCashkick(
        cashkick,
        contractIds
      );

      expect(Cashkick.create).toHaveBeenCalledWith(cashkick);
      expect(CashkickContract.create).toHaveBeenCalledTimes(contractIds.length);
      expect(CashkickContract.create).toHaveBeenCalledWith({
        contract_id: contractIds[0],
        cashkick_id: newCashkick.id,
      });
      expect(result).toEqual(newCashkick);
    });

    it("should throw an error if cashkick creation or contract association fails", async () => {
      const error = new Error("Database error");
      (Cashkick.create as jest.Mock).mockRejectedValue(error);

      await expect(
        cashkickService.createCashkick(cashkick, contractIds)
      ).rejects.toThrow(CASHKICK_MSG.CREATION_FAILED + error);
      expect(Cashkick.create).toHaveBeenCalledWith(cashkick);
    });
  });

  describe("getCashkicksByUserId", () => {
    it("should return a list of cashkicks for a given user", async () => {
      const cashkicks = [cashkick];
      (Cashkick.findAll as jest.Mock).mockResolvedValue(cashkicks);

      const result = await cashkickService.getCashkickByUserId(1, 1, 2);
      expect(result).toEqual(cashkicks);
    });

    it("should throw an error if fetching cashkicks fails", async () => {
      const error = new Error("Database error");
      (Cashkick.findAll as jest.Mock).mockRejectedValue(error);

      await expect(
        cashkickService.getCashkickByUserId(1, 1, 2)
      ).rejects.toThrow(CASHKICK_MSG.RETRIEVE_FAILED + error);
    });
  });
});
