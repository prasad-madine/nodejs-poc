import User from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EXP_TIME, INVALID_MSG, JWT_DEFAULT_KEY } from "../utils/constants";

export const authenticationService = {
  login: async (email: string, password: string) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { success: false, message: INVALID_MSG };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { success: false, message: INVALID_MSG };
      }

      const accessToken = jwt.sign(
        { userId: user.dataValues.id },
        process.env.JWT_SECRET_KEY ?? JWT_DEFAULT_KEY,
        { expiresIn: EXP_TIME }
      );
      return { success: true, token: accessToken };
    } catch (error) {
      throw error;
    }
  },
};
