import express from "express";
import User from "../model/users.js";
import userAuth from "../middleware/authMiddleware.js";
import connectionRequest from "../model/connectionRequests.js";
import mongoose from "mongoose";

const requestRouter = express.Router();

requestRouter.post(
  "/request/sent/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.userId;
      const fromUserId = req.user._id;
      const status = req.params.status;
      const allowedStatus = ["ignored", "intrested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status");
      }
      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        throw new Error("Invalid Request");
      }
      const userData = await User.findById(toUserId);

      if (!userData) {
        throw new Error("Invalid Request");
      }
      const existingRequest = await connectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });
      if (existingRequest) {
        throw new Error(
          "Connection Request Already Exist Check Request Section"
        );
      }

      const dataToSaved = new connectionRequest({
        toUserId,
        fromUserId,
        status,
      });

      const data = await dataToSaved.save();
      res.json({
        Message: `${status} ${userData.firstName} successfully `,
        data,
      });
    } catch (err) {
      res.status(400).send("Error occured => " + err.message);
    }
  }
);
//review request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedinUserId = req.user._id;
      const status = req.params.status;
      const requestId = req.params.requestId;
      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        throw new Error(" Invalid request");
      }
      const accessToEdit = ["accepted", "rejected"];
      if (!accessToEdit.includes(status)) {
        throw new Error(" Invalid action");
      }
      const foundData = await connectionRequest.findOne({
        _id: requestId,
        status: "intrested",
        toUserId: loggedinUserId,
      });
      if (!foundData) {
        throw new Error("No Request Found ");
      }
      foundData.status = status;
      const data = await foundData.save();
      res.json({ message: `${status} successfully`, data });
    } catch (err) {
      res.status(400).send("Error occured => " + err.message);
    }
  }
);

export default requestRouter;
