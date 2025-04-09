import { Request, Response, NextFunction } from "express";
import { authenticationService } from "../service/authenticationService";
import { STATUS_CODES } from "../utils/constants";

export const authenticationController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const result = await authenticationService.login(email, password);
      if (result.success) {
        return res.status(STATUS_CODES.SUCCESS).json({ token: result.token });
      } else {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: result.message });
      }
    } catch (error) {
      next(error);
    }
  },
};
