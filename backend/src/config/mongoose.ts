import dotenv from "dotenv";
import { connect, set } from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI as string;

// connection to db
export const connectToDB = async () => {
  try {
    set("strictQuery", false);
    const db = await connect(MONGO_URI);
    console.log("MongoDB connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
};
