import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "User name is required!"],
   },
   email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email already exists!"],
   },
   password: {
      type: String,
      required: [true, "Password is required!"],
   },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
