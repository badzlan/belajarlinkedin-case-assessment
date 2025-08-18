import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({ path: ".env" });

export const createToken = (email) => {
   return jwt.sign({ email }, process.env.JWT_SECRET);
};
