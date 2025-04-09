import { Request, Response, NextFunction } from "express";
import { userController } from "../../controller/userController";
import { userService } from "../../service/userService";
import { sendResponse } from "../../utils/helper";
import { INVALID_ID, STATUS_CODES, USER_MSG } from "../../utils/constants";

jest.mock("../../service/userService");
jest.mock("../../utils/helper");

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
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

  describe("createUser", () => {
    it("should create a user and give success response", async () => {
      req.body = {
        name: "test",
        email: "test@example.com",
        password: "password123",
        available_credit: 1000,
      };
      const createdUser = { id: 1, ...req.body };
      (userService.createUser as jest.Mock).mockResolvedValue(createdUser);

      await userController.createUser(req as Request, res as Response, next);
      expect(userService.createUser).toHaveBeenCalledWith(req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.CREATED, {
        message: USER_MSG.CREATION_SUCCESS,
        user: createdUser,
      });
    });
    it("should handle errors while creating user", async () => {
      const error = new Error("Service error");
      req.body = {
        name: "test",
        email: "john.doe@example.com",
        password: "password123",
        available_credit: 1000,
      };
      (userService.createUser as jest.Mock).mockRejectedValue(error);
      await userController.createUser(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
  describe("update user", () => {
    it("should update a user and give success response", async () => {
      req.params = { userId: "1" };
      req.body = {
        password: "newPassword",
        available_credit: 500,
      };
      const updatedUser = { id: 1, ...req.body };
      (userService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

      await userController.updateUser(req as Request, res as Response, next);
      expect(userService.updateUser).toHaveBeenCalledWith(1, req.body);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        message: USER_MSG.UPDATE_SUCCESS,
        user: updatedUser,
      });
    });
    it("should return Bad Request for invalid userId", async () => {
      req.params = { userId: "invalid" };
      req.body = {
        password: "newPassword",
        available_credit: 500,
      };

      await userController.updateUser(req as Request, res as Response, next);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: INVALID_ID,
      });
      expect(userService.updateUser).not.toHaveBeenCalled();
    });
    it("should handle errors while updating errors", async () => {
      const error = new Error("Service error");
      req.params = { userId: "1" };
      req.body = {
        password: "newPassword",
        available_credit: 500,
      };
      (userService.updateUser as jest.Mock).mockRejectedValue(error);
      await userController.updateUser(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
  describe("get user by id", () => {
    it("should return the user with given id", async () => {
      req.params = { userId: "1" };
      const user = { id: "1", email: "test@gmail.com" };
      (userService.getUserById as jest.Mock).mockResolvedValue(user);
      await userController.getUserById(req as Request, res as Response, next);

      expect(userService.getUserById).toHaveBeenCalledWith(1);
      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.SUCCESS, {
        message: USER_MSG.RETRIEVE_SUCCESS,
        user,
      });
    });
    it("should return 400 if id is not provided", async () => {
      req.params = {};

      await userController.getUserById(req as Request, res as Response, next);

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.BAD_REQUEST, {
        message: INVALID_ID,
      });
      expect(userService.getUserById).not.toHaveBeenCalled();
    });
    it("should return 404 if user is not found", async () => {
      req.params = { userId: "1" };
      (userService.getUserById as jest.Mock).mockResolvedValue(null);

      await userController.getUserById(req as Request, res as Response, next);

      expect(sendResponse).toHaveBeenCalledWith(res, STATUS_CODES.NOT_FOUND, {
        message: USER_MSG.NOT_FOUND,
      });
    });

    it("should handle errors when fetching user", async () => {
      const error = new Error("Service Error");
      req.params = { userId: "1" };
      (userService.getUserById as jest.Mock).mockRejectedValue(error);

      await userController.getUserById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(sendResponse).not.toHaveBeenCalled();
    });
  });
});
