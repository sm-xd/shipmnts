import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://sumit:admin@sky.zmnns4b.mongodb.net/shp"
console.log(MONGO_URL)
// Connect Database
export const connectDB = mongoose.connect(MONGO_URL)
.then(console.log("DB Connected Succesfully...."))
.catch((err)=>{
console.log("DB Connection Failed!")
console.log(err)
process.exit(1)
});
export default connectDB;