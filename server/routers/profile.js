import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import {
  validateEditRequest,
  validateChangePasswordRequest,
} from "../utils/validation.js";
import validator from "validator";
import bcrypt from "bcrypt";

const profileRouter = express.Router();

profileRouter.get("/profile/get", userAuth, async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      throw new Error(" Unauthorized access");
    }

    res.send(userData);
  } catch (err) {
    res.status(401).send("Error Occured " + err.message);
  }
});

profileRouter.put("/profile/update", userAuth, async (req, res) => {
  try {
    if (!validateEditRequest(req)) {
      throw new Error("Not allowed to edit");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      Message: `${loggedInUser.firstName} your Data Saved Succesfully`,
      loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error Occured => " + err.message);
  }
});

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    if (!validateChangePasswordRequest(req)) {
      throw new Error("Not allowed to Edit");
    }
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const loggedInUser = req.user;

    if (!validator.isStrongPassword(confirmPassword)) {
      throw new Error("Enter Strong Password");
    }
    const validPassword = await loggedInUser.ispasswordVerified(
      currentPassword
    );
    if (!validPassword) {
      throw new Error("Invalid current Password");
    }
    if (newPassword !== confirmPassword) {
      throw new Error(" Both Password are not Same");
    }
    passwordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = passwordHash;

    await loggedInUser.save();
    res.send("Password changed sucessfully");
  } catch (err) {
    res.status(400).send("Error Occured => " + err.message);
  }
});

export default profileRouter;
