import Class from "../models/Class.js";
import Enrollment from "../models/Enrollment.js";

export const createClass = async (req, res) => {
   const { name, description, category } = req.body;

   try {
      if (!name || !description || !category) {
         return res.status(400).json({ error: "All fields are required!" });
      }

      await Class.create({ name, description, category });
      return res.status(201).send({ message: "Class created successfully!" });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};

export const getAllClasses = async (req, res) => {
   const { category } = req.query;

   try {
      if (category != null) {
         const filter = await Class.find({ category }).select("-__v");

         if (filter.length === 0) {
            return res.status(404).json({ error: "Class not found" });
         } else {
            return res.status(200).send({ classes: filter });
         }
      } else {
         const classes = await Class.find().select("-__v");

         if (classes.length === 0) {
            return res.status(404).json({ message: "No class found" });
         } else {
            return res.status(200).send({ classes });
         }
      }
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};

export const getOneClass = async (req, res) => {
   const { id } = req.params;

   try {
      const classes = await Class.findById(id).select("-__v");
      const enrollments = await Enrollment.find({ class_id: id }).populate("user_id", "-password -__v");

      if (!classes) {
         return res.status(404).json({ error: "Class not found!" });
      }

      return res.status(200).send({
         class: classes,
         enrolledUsers: enrollments.map((e) => e.user_id),
      });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};

export const updateClass = async (req, res) => {
   const { id } = req.params;
   const { name, description, category } = req.body;

   try {
      if (!name || !description || !category) {
         return res.status(400).json({ error: "All fields are required!" });
      }

      const classes = await Class.findById(id).select("-__v");
      if (!classes) {
         return res.status(404).json({ error: "Class not found!" });
      }

      const classesUpdated = await Class.findByIdAndUpdate(id, { name, description, category }, { new: true });
      return res.status(200).send({ message: "Class updated successfully!", class: classesUpdated });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};

export const deleteClass = async (req, res) => {
   const { id } = req.params;

   try {
      const classes = await Class.findById(id).select("-__v");
      if (!classes) {
         return res.status(404).json({ error: "Class not found!" });
      }

      await Class.findByIdAndDelete(id);
      return res.status(200).send({ message: "Class deleted successfully!" });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};
