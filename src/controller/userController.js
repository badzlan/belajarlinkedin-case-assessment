import bcrypt from "bcrypt";
import User from "../model/User.js";
import Enrollment from "../model/Enrollment.js";
import { createToken } from "../middleware/Auth.js";

export const register = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      if (!name || !email || !password) {
         throw Error("All fields are required!");
      }

      const exist = await User.findOne({ email });
      if (exist) {
         throw Error("Email exist!");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      await User.create({ name, email, password: hash });
      res.status(201).send({ message: "Register successful!" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user) {
         throw Error("Email not found!");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
         throw Error("Incorrect password");
      }

      const token = createToken(user._id);
      res.status(200).send({
         email: user.email,
         username: user.username,
         message: "Login successful!",
         token,
      });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const profile = async (req, res) => {
   try {
      const user = await User.findById(req.user._id).select("-password -__v");
      const enrollments = await Enrollment.find({ user_id: req.user._id }).populate("class_id", "-__v");

      if (!user) {
         throw Error("User not found!");
      }

      res.status(200).json({
         user,
         enrolledCourses: enrollments.map((enroll) => enroll.class_id),
      });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
