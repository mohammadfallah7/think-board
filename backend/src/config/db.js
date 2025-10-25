import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected successfully");
  } catch {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
}
