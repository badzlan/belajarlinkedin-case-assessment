import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Username is required!"],
   },
   description: {
      type: String,
      required: [true, "description is required!"],
   },
   category: {
      type: String,
      required: [true, "category is required!"],
   }
});

export default mongoose.model.Classes || mongoose.model("Class", classSchema);