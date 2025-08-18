import Class from "../model/Class.js";

export const createClass = async (req, res) => {
   const { name, description, category } = req.body;

   try {
      if (!name || !description || !category) {
         throw Error("All fields are required!");
      }

      await Class.create({ name, description, category });
      res.status(201).send({ message: "Class created successfully!" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const getAllClasses = async (req, res) => {
   const { category } = req.query;

   try {
      if (category != null) {
         const filter = await Class.find({ category }).select("-__v");
         filter.length === 0 ? res.status(404).json({ error: "Class not found" }) : res.status(200).send({ classes: filter });
      } else {
         const classes = await Class.find().select("-__v");
         classes.length === 0 ? res.status(200).json({ message: "No class found" }) : res.status(200).send({ classes });
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const getOneClass = async (req, res) => {
   const { id } = req.params;

   try {
      const classes = await Class.findById(id).select("-__v");
      classes.length === 0 ? res.status(404).json({ error: "Class not found" }) : res.status(200).send({ class: classes });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const updateClass = async (req, res) => {
   const { id } = req.params;
   const { name, description, category } = req.body;

   try {
      if (!name || !description || !category) {
         throw Error("All fields are required!");
      }

      const classes = await Class.findById(id).select("-__v");
      if (!classes) {
         throw Error("Class not found!");
      }

      await Class.findByIdAndUpdate(id, { name, description, category }, { new: true });
      res.status(200).send({ message: "Class updated successfully!", class: classes });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const deleteClass = async (req, res) => {
   const { id } = req.params;

   try {
      const classes = await Class.findById(id).select("-__v");
      if (!classes) {
         throw Error("Class not found!");
      }

      await Class.findByIdAndDelete(id);
      res.status(200).send({ message: "Class deleted successfully!" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};
