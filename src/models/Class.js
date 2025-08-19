import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Class name is required!"],
   },
   description: {
      type: String,
      required: [true, "Class description is required!"],
   },
   category: {
      type: String,
      required: [true, "Class category is required!"],
   },
});

export default mongoose.models.Class || mongoose.model("Class", classSchema);
