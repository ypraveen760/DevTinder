import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.CONNECTION_STRING;

const dbConnect = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to database successfully");
  } catch (error) {
    throw new Error(
      `Error While Connection To DataBase : ${error?.message} ` ||
        "Error While Connection To DataBase"
    );
    console.log("Error occured  While connecting to database");
  }
};
export default dbConnect;
