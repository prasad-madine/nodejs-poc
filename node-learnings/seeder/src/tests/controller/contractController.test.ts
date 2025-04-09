import { Response, Request, NextFunction } from "express";
import { contractController } from "../../controller/contractController";
import { contractService } from "../../service/contractService";
import { CONTRACT_MSG, STATUS_CODES } from "../../utils/constants";
import { sendResponse } from "../../utils/helper";

jest.mock("../../service/contractService");
jest.mock("../../utils/helper");

describe("Contract Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
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

  describe("create contract", () => {
    it("should create a contract and return success response", async () => {
      req.body = {
        name: "Contract 1",
        type: "MONTHLY",
        interest: 12,
        per_payment: 10000,
        payment_amount: 10000,
        term_length: 12,
      };
      const createdContract = { id: 1, ...req.body };
      (contractService.createContract as jest.Mock).mockResolvedValue(
        createdContract
      );

      await contractController.createContract(
        req as Request,
        res as Response,
        next
      );

      expect(contractService.createContract).toHaveBeenCalledWith(req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.CREATED, {
        message: CONTRACT_MSG.CREATION_SUCCESS,
        contract: createdContract,
      });
    });
    it("should handle errors when creating contract", async () => {
      const error = new Error("Service Error");
      req.body = {
        name: "Contract 1",
        type: "MONTHLY",
        interest: 12,
        per_payment: 10000,
        payment_amount: 10000,
        term_length: 12,
      };
      (contractService.createContract as jest.Mock).mockRejectedValue(error);

      await contractController.createContract(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
  describe("getAllContracts", () => {
    it("should retrieve all contracts successfully", async () => {
      req.query = { page: "1", limit: "2" };
      const contracts = [
        {
          id: 1,
          name: "contract 1",
          type: "MONTHLY",
          interest: 12,
          per_payment: 888585,
          payment_amount: 677855,
          term_length: 12,
        },
        {
          id: 2,
          name: "contract 2",
          type: "MONTHLY",
          interest: 12,
          per_payment: 888585,
          payment_amount: 677855,
          term_length: 12,
        },
      ];
      (contractService.getAllContracts as jest.Mock).mockResolvedValue(
        contracts
      );

      await contractController.getAllContracts(
        req as Request,
        res as Response,
        next
      );

      expect(contractService.getAllContracts).toHaveBeenCalledWith(1, 2);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        message: CONTRACT_MSG.RETRIEVE_SUCCESS,
        contracts,
      });
    });

    it("should handle errors when fetching contracts", async () => {
      req.query = { page: "1", limit: "3" };
      const error = new Error("Service Error");
      (contractService.getAllContracts as jest.Mock).mockRejectedValue(error);

      await contractController.getAllContracts(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
});
