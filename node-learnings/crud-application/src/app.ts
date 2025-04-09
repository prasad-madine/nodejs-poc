import express, { Application, Request, Response } from "express";
import sequelize from "./config/database";
import User from "./models/user";
import Post from "./models/post";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
// import CookieParser from "cookie-parser";
import session from "express-session";

const app: Application = express();

app.use(express.json());
// app.use(CookieParser());
app.use(
  session({
    secret: "mysecret",
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
  })
);
// app.use(CookieParser("secretKey"));

// User.hasMany(Post, { foreignKey: 'userId' });
// Post.belongsTo(User, { foreignKey: 'userId' });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced successfully!!!");
  })
  .catch((error: any) => {
    console.log(error);
  });

// app.get("/set-cookie", (req: Request, res: Response) => {
//   res.cookie("username", "VaraPrasad", {
//     maxAge: 60 * 60 * 1000,
//   });
//   res.send("Cookie has been set!");
// });

// app.get("/get-cookie", (req: Request, res: Response) => {
//   const username = req.cookies["username"];
//   if (username) {
//     res.send(`Hello, ${username}!`);
//   } else {
//     res.send("No cookies found.");
//   }
// });

// app.get("/delete-cookie", (req: Request, res: Response) => {
//   res.clearCookie("username");
//   res.send("Cookie has been deleted.");
// });

// app.get("/set-signed-cookie", (req: Request, res: Response) => {
//   res.cookie("username", "VaraPrasad", {
//     maxAge: 24 * 60 * 60 * 1000,
//     signed: true,
//   });
//   res.send("Signed cookie has been set!");
// });

// app.get("/get-signed-cookie", (req: Request, res: Response) => {
//   const username = req.signedCookies["username"];

//   if (username) {
//     res.send(`Hello, ${username}!`);
//   } else {
//     res.send("No signed cookies found or signature is invalid.");
//   }
// });

// app.get("/delete-signed-cookie", (req: Request, res: Response) => {
//   res.clearCookie("username");
//   res.send("Signed cookie has been deleted.");
// });

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
