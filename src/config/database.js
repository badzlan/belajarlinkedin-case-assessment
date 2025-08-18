import mongoose from "mongoose"; 
import { config } from "dotenv";

config({ path: ".env" });

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
   console.log("✅ Database Connected");
});

mongoose.connection.on("error", (err) => {
   console.error("❌ Database connection error:", err);
});

mongoose.connection.on("disconnected", () => {
   console.log("⚠️ Database Disconnected");
});

export default mongoose;
