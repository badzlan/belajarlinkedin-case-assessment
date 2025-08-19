import bcrypt from "bcrypt";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import { createToken } from "../middleware/Auth.js";

export const register = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      if (!name || !email || !password) {
         return res.status(400).json({ error: "All fields are required!" });
      }

      const exist = await User.findOne({ email });
      if (exist) {
         return res.status(400).json({ error: "Email already exists!" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      await User.create({ name, email, password: hash });
      return res.status(201).json({ message: "Register successful!" });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ error: "User not found!" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
         return res.status(400).json({ error: "Invalid password!" });
      }

      const token = createToken(user._id);
      return res.status(200).json({
         email: user.email,
         name: user.name,
         message: "Login successful!",
         token,
      });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};

export const profile = async (req, res) => {
   try {
      const user = await User.findById(req.user._id).select("-password -__v");
      if (!user) {
         return res.status(404).json({ error: "User not found!" });
      }

      const enrollments = await Enrollment.find({ user_id: req.user._id }).populate("class_id", "-__v");

      return res.status(200).json({
         user,
         enrolledCourses: enrollments.map((enroll) => enroll.class_id),
      });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};
