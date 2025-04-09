import { Request, Response, NextFunction } from "express";
import { userService } from "../service/userService";
import { sendResponse } from "../utils/helper";
import { INVALID_ID, STATUS_CODES, USER_MSG } from "../utils/constants";

export const userController = {
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.userId);
      if (isNaN(userId)) {
        sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: INVALID_ID,
        });
        return;
      }
      const user = await userService.getUserById(userId);
      if (!user) {
        sendResponse(res, STATUS_CODES.NOT_FOUND, {
          message: USER_MSG.NOT_FOUND,
        });
        return;
      }
      sendResponse(res, STATUS_CODES.SUCCESS, {
        user: user,
        message: USER_MSG.RETRIEVE_SUCCESS,
      });
    } catch (err) {
      next(err);
    }
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, available_credit } = req.body;
      const user = await userService.createUser({
        name,
        email,
        password,
        available_credit,
      });
      sendResponse(res, STATUS_CODES.CREATED, {
        user: user,
        message: USER_MSG.CREATION_SUCCESS,
      });
    } catch (err) {
      next(err);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.userId);
      const { password, available_credit } = req.body;
      if (isNaN(userId)) {
        sendResponse(res, STATUS_CODES.BAD_REQUEST, {
          message: INVALID_ID,
        });
        return;
      }
      const updatedUser = await userService.updateUser(userId, {
        password,
        available_credit,
      });
      sendResponse(res, STATUS_CODES.SUCCESS, {
        user: updatedUser,
        message: USER_MSG.UPDATE_SUCCESS,
      });
    } catch (err) {
      next(err);
    }
  },
};
