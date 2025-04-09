import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import User from "../model/user";
import Cashkick from "../model/cashkick";
import Payment from "../model/payment";
import Contract from "../model/contract";
import CashkickContract from "../model/cashkick_contract";
import { Dialect } from "sequelize";

dotenv.config();

const database_name = process.env.DB_NAME as string;
const database_user = process.env.DB_USER as string;
const database_driver = process.env.DB_DRIVER as Dialect;
const database_password = process.env.DB_PASSWORD;

const database: Sequelize = new Sequelize({
  database: database_name,
  password: database_password,
  username: database_user,
  dialect: database_driver,
  models: [User, Cashkick, Payment, Contract, CashkickContract],
});

export default database;
