import express from "express";
import database from "./config/database";
import bodyParser from "body-parser";
import userRoutes from "./router/userRouter";
import contractRoutes from "./router/contractRouter";
import paymentRoutes from "./router/paymentRouter";
import cashkickRoutes from "./router/cashkickRouter";
import authenticationRoutes from "./router/authenticationRouter";
import { errorHandler } from "./middleware/errorHandler";
import {
  AUTH,
  CASHKICK,
  CONTRACT,
  DATABASE_SYNC_FAILED,
  DATABASE_SYNC_SUCCESS,
  PAYMENT,
  SERVICE_LISTEN,
  USER,
} from "./utils/constants";

const port = process.env.PORT || 3002;

const app = express();

app.use(bodyParser.json());

app.use(AUTH, authenticationRoutes);
app.use(USER, userRoutes);
app.use(CONTRACT, contractRoutes);
app.use(CASHKICK, cashkickRoutes);
app.use(PAYMENT, paymentRoutes);

app.use(errorHandler);

database
  .sync()
  .then(() => {
    console.log(DATABASE_SYNC_SUCCESS);
  })
  .catch((err) => {
    console.error(DATABASE_SYNC_FAILED, err);
  });

app.listen(port, () => {
  console.log(SERVICE_LISTEN, port);
});
