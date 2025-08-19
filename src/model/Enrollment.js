import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
   user_id : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: [true, "User id is required!"],
   },
   class_id : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Class",
      required: [true, "Class id is required!"],
   }
});

export default mongoose.model.Enrollments || mongoose.model("Enrollment", enrollmentSchema);