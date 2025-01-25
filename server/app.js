import express from "express";
import dbConnect from "./config/dbConnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import authRouter from "./routers/auth.js";
import profileRouter from "./routers/profile.js";
import requestRouter from "./routers/request.js";
import userRouter from "./routers/user.js";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://16.170.243.171",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

dbConnect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server sucessfully  listining to port ${port}...`);
    });
  } catch (err) {
    console.log("Error Occured", err.message);
  }
});
