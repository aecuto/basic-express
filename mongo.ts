import { connect } from "mongoose";

// .env
import dotenv from "dotenv";
dotenv.config();

export default () => {
  try {
    // uri from mongo atlas
    const uri = process.env.MONGO_URI || "";
    connect(uri);
  } catch (error) {
    console.log(error);
  }
};
