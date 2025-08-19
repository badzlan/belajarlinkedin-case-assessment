import mongoose from "mongoose";

mongoose
   .connect(process.env.DB_URL)
   .then(() => console.log("✅ Database Connected"))
   .catch((err) => {
      console.error("❌ Database connection error:", err);
      process.exit(1);
   });

export default mongoose;
