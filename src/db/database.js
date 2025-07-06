import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_ATLAS_CONNECTION_STRING);

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_ATLAS_CONNECTION_STRING}`
    );
    console.log("Mongodb connected Successfully..!!");

    console.log(`Mongodb Connection String ${connectionInstance}`);
  } catch (error) {
    console.error("Mongodb Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;

/*
Async function execute it always return promise.
*/
