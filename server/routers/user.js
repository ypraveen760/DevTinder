import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import connectionRequest from "../model/connectionRequests.js";
import User from "../model/users.js";
import mongoose from "mongoose";

const userRouter = express.Router();

//get user data
userRouter.get("/user", userAuth, async (req, res) => {
  try {
    const userData = req.user;
    res.send(userData);
  } catch (err) {
    res.status(500).send("somthing went wrong!!");
  }
});
//to update user data
userRouter.put("/profile/update", userAuth, async (req, res) => {
  const userid = req.user._id;
  const Updatedata = req.body;
  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).send("ID is not valid");
  }
  try {
    const allowedUpdate = ["age", "gender", "about", "photo", "skills"];
    const filteredUpdates = {};
    const isAllowedUpdate = Object.keys(Updatedata).every((k) =>
      allowedUpdate.includes(k)
    );
    if (!isAllowedUpdate) {
      throw new Error("update not allowed");
    }
    const data = await User.findByIdAndUpdate(userid, Updatedata, {
      new: true,
      runValidators: true,
    });

    res.json({ message: "Data updated sucessfully" });
  } catch (err) {
    res.status(501).send("Somthing went wrong => " + err.message);
  }
});

const publicData = ["firstName", "lastName", "about", "photo", "skills"];
//see all request
userRouter.get("/user/request/recived", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const data = await connectionRequest
      .find({
        toUserId: loggedinUser._id,
        status: "intrested",
      })
      .populate("fromUserId", publicData);
    res.json(data);
  } catch (err) {
    res.status(401).send("Error Occured" + err.message);
  }
});
//see all connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const userConnections = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedinUser._id, status: "accepted" },
          { fromUserId: loggedinUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", publicData)
      .populate("toUserId", publicData);
    const userData = userConnections.map((row) => {
      if (row.fromUserId._id.toString() === loggedinUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.json({ message: `All Connections fetch successfully`, userData });
  } catch (err) {
    res.status(401).send("Error Occured" + err.message);
  }
});
//feed api
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 50;
    limit = Math.min(limit, 40);
    const skip = (page - 1) * limit;
    const loggedinUser = req.user;
    const feed = await connectionRequest
      .find({
        $or: [{ toUserId: loggedinUser }, { fromUserId: loggedinUser }],
      })
      .select("fromUserId toUserId");
    const hideUserFromFeed = new Set();
    feed.forEach((req) => {
      hideUserFromFeed.add(req.toUserId.toString());
      hideUserFromFeed.add(req.fromUserId.toString());
    });
    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedinUser._id } },
      ],
    })
      .select(publicData)
      .limit(limit)
      .skip(skip);
    res.send(user);
  } catch (err) {
    throw new Error("Error Occured => " + err.message);
  }
});
export default userRouter;
