import { Request, Response, NextFunction } from "express";
import { authenticationController } from "../../controller/authenticationController";
import { authenticationService } from "../../service/authenticationService";

jest.mock("../../service/authenticationService");

describe("Authentication controller", () => {
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
  describe("login", () => {
    it("should login and return token with status 200", async () => {
      req.body = { email: "test@example.com", password: "password12" };
      const result = { success: true, token: "sample-token" };
      (authenticationService.login as jest.Mock).mockResolvedValue(result);

      await authenticationController.login(
        req as Request,
        res as Response,
        next
      );
      expect(authenticationService.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: result.token });
    });
    it("should handle errors and call next with error", async () => {
      const error = new Error("Service Error");
      req.body = { email: "test@example.com", password: "password12" };
      (authenticationService.login as jest.Mock).mockRejectedValue(error);

      await authenticationController.login(
        req as Request,
        res as Response,
        next
      );

      expect(authenticationService.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(next).toHaveBeenCalledWith(error);
    });
    it("should return bad request during wrong credentials", async () => {
      req.body = { email: "test@example.com", password: "incorrectpassword" };
      const result = { success: false, message: "Invalid credentials" };
      (authenticationService.login as jest.Mock).mockResolvedValue(result);

      await authenticationController.login(
        req as Request,
        res as Response,
        next
      );
      expect(authenticationService.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: result.message });
    });
  });
});
