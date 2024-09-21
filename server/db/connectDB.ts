import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Server connected to mongoDb");
  } catch (error) {
    console.error("Mongo Connection Failed", error);
  }
};

export default connectDB;
