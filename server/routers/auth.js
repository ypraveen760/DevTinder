import express from "express";
import validator from "validator";
import User from "../model/users.js";
import bcrypt from "bcrypt";
import { signupValidator } from "../utils/validation.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Please enter valid Email ID");
    }
    const userData = await User.findOne({ emailId: emailId });
    if (!userData) {
      throw new Error("Invalid Credentials");
    }
    // for direct way = const passwordHash = userData.password; right now we are using schema method
    const isPasswordValid = await userData.ispasswordVerified(password); // this is direct way = bcrypt.compare(password, passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      // const token = await jwt.sign({ _id: userData._id }, "Happy@143");//this is we are doing manual but we have created this method in (schema method)
      const token = await userData.getJWT(); //this is schema method we are using and this is good prctice to do
      res.cookie("token", token);

      res.send(userData);
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
});
authRouter.post("/signup", async (req, res) => {
  //for  sanitazation and validation we have create validator function signValidator() it will do this work
  try {
    signupValidator(req);
    const { firstName, lastName, emailId, password } = req.body;
    const alreadyUser = await User.findOne({ emailId: emailId });
    if (alreadyUser) {
      return res.send("User already Exist");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    user.save();
    res.send("SignUp Sucessfull");
  } catch (err) {
    res.status(500).send("Error Occured" + err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Sucessful");
});

export default authRouter;
