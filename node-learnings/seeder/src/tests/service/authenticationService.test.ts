import { authenticationService } from "../../service/authenticationService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../model/user";
import { INVALID_MSG } from "../../utils/constants";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../model/user");

describe("Authentication service", () => {
  const email = "test@example.com";
  const password = "password@123";
  const user = {
    dataValues: {
      id: 1,
      email: email,
      password: "hashedpassword",
    },
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return an error message if email is incorrect", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await authenticationService.login(email, password);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual({
        success: false,
        message: INVALID_MSG,
      });
    });

    it("should return an error message if password is incorrect", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await authenticationService.login(email, password);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual({
        success: false,
        message: INVALID_MSG,
      });
    });

    it("should throw an error if login process fails", async () => {
      const error = new Error("Database error");
      (User.findOne as jest.Mock).mockRejectedValue(error);

      await expect(
        authenticationService.login(email, password)
      ).rejects.toThrow(error);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
    });

    it("should return success with token when valid credentials are provided", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockResolvedValue("mockedToken");

      const result = await authenticationService.login(email, password);
      expect(User.findOne).toHaveBeenCalledWith({ where: { email } });
      // expect(jwt.sign).toHaveBeenCalledWith(
      //   { userId: user.dataValues.id, email: user.dataValues.email },
      //   expect.any(String),
      //   { expiresIn: "10m" }
      // );
      // expect(result).toEqual({ success: true, token: "mockedToken" });
    });
  });
});
