import mongoose from "mongoose";

export const connectDB = async () => {
  try 
  {
    console.log("Trying to connect DB...");
    console.log("MONGO_URI =", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } 
  catch (error) 
  {
    console.error("Error connecting to MONGODB", error);
    process.exit(1);
  }
};
