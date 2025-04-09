import { IUser } from "../interface/interface";
import User from "../model/user";
import { STATUS_CODES, USER_MSG } from "../utils/constants";
import { hashPassword } from "../utils/helper";
import { plainToInstance } from "class-transformer";
import createHttpError from "http-errors";

export const userService = {
  getUserById: async (userId: number) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error(USER_MSG.USER_ID_NOT_FOUND);
      }
      const responseUser = plainToInstance(User, user, {
        excludeExtraneousValues: true,
      });
      return responseUser;
    } catch (error) {
      throw createHttpError(STATUS_CODES.NOT_FOUND, USER_MSG.NOT_FOUND);
    }
  },
  createUser: async (userData: IUser) => {
    try {
      const user = await User.findOne({
        where: { email: userData.email },
      });
      if (user) {
        throw new Error(USER_MSG.ALREADY_IN_USE);
      }
      const { name, email, password, available_credit } = userData;
      const hashedPassword = await hashPassword(password);
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
        available_credit,
      });
      const newUser = plainToInstance(User, createdUser, {
        excludeExtraneousValues: true,
      });
      return newUser;
    } catch (error) {
      throw new Error(USER_MSG.CREATION_FAILED + error);
    }
  },
  updateUser: async (userId: number, updateData: Partial<IUser>) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error(USER_MSG.NOT_FOUND);
      }
      const updatedFields: Partial<IUser> = {};
      if (updateData.password !== undefined) {
        updatedFields.password = updateData.password;
      }
      if (updateData.available_credit !== undefined) {
        updatedFields.available_credit = updateData.available_credit;
      }
      const updatedUser = await user.update(updatedFields);
      const updatedResponseUser = plainToInstance(User, updatedUser, {
        excludeExtraneousValues: true,
      });
      return updatedResponseUser;
    } catch (error) {
      throw new Error(USER_MSG.UPDATE_FAILED + error);
    }
  },
};
