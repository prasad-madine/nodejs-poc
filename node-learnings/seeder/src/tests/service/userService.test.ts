import User from "../../model/user";
import { userService } from "../../service/userService";
import bcrypt from "bcrypt";
import { IUser } from "../../interface/interface";
import { plainToInstance } from "class-transformer";
import createHttpError from "http-errors";
import { STATUS_CODES, USER_MSG } from "../../utils/constants";

jest.mock("../../model/user");
jest.mock("bcrypt");
jest.mock("../../utils/helper");

describe("User Service", () => {
  let user: IUser = {
    name: "testuser",
    email: "test@example.com",
    password: "password123",
    available_credit: 1000,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("updateUser", () => {
    const updatedUser = { ...user, available_credit: 400 };

    it("should update the user's credit balance", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({
        ...user,
        update: jest.fn().mockResolvedValue(updatedUser),
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedNewPassword");

      const updates = { password: "newPassword", available_credit: 400 };
      await userService.updateUser(1, updates);

      expect(User.findByPk).toHaveBeenCalledWith(1);
    });
    it("should throw an error if user does not exist", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(
        userService.updateUser(1, { available_credit: 200 })
      ).rejects.toThrow(USER_MSG.NOT_FOUND);
      expect(User.findByPk).toHaveBeenCalledWith(1);
    });

    it("should throw an error if update fails", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({
        ...user,
        update: jest.fn().mockRejectedValue(new Error("Update error")),
      });

      await expect(
        userService.updateUser(1, { available_credit: 200 })
      ).rejects.toThrow(USER_MSG.UPDATE_FAILED + new Error("Update error"));
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const mockUser = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        available_credit: 223322,
      };
      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      const expectedResponse = plainToInstance(User, mockUser, {
        excludeExtraneousValues: true,
      });
      console.log(expectedResponse);
      await userService.getUserById(1);
      expect(User.findByPk).toHaveBeenCalledWith(1);
    });

    it("should throw a not found error if user is not found by ID", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(userService.getUserById(1)).rejects.toThrow(
        createHttpError(STATUS_CODES.NOT_FOUND, USER_MSG.NOT_FOUND)
      );
    });
  });

  describe("createUser", () => {
    it("should create a new user when user does not exist", async () => {
      (User.findOne as jest.Mock).mockReturnValue(null);
      (User.create as jest.Mock).mockReturnValue(user);
      (bcrypt.hash as jest.Mock).mockReturnValue("hashedPassword");

      await userService.createUser(user);
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: user.email },
      });
    });
    it("should throw an error if the email is already in use", async () => {
      const userData = {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "anothersecurepassword",
        available_credit: 3000,
      };

      const existingUser = { id: 2, ...userData };
      (User.findOne as jest.Mock).mockResolvedValue(existingUser);
      await expect(userService.createUser(userData)).rejects.toThrow(
        USER_MSG.ALREADY_IN_USE
      );
      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
      expect(User.create).not.toHaveBeenCalled();
    });
  });
});
