import jwt from "jsonwebtoken";
import User from "../model/users.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login !");
    }
    const decordMessage = await jwt.verify(token, "Happy@143");
    const { _id } = decordMessage;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).send("invalid token");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("Error occurred while verifying the token");
  }
};
export default userAuth;
