import mongoose from "mongoose";

const dbConnect = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment");
  }

  try {
    const connected = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
