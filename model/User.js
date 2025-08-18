import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Username is required!"],
   },
   email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email exist!"],
   },
   
   password: {
      type: String,
      required: [true, "Password is required!"],
   },
});

export default mongoose.model.Users || mongoose.model("User", userSchema);