import Enrollments from "../models/Enrollment.js";

export const enrollment = async (req, res) => {
   const { class_id } = req.body;
   const user_id = req.user._id;

   try {
      const exist = await Enrollments.findOne({ user_id, class_id });

      if (exist) {
         return res.status(400).json({ error: "You are already enrolled in this class!" });
      }

      await Enrollments.create({ user_id, class_id });
      res.status(201).send({ message: "Enrollment successful!" });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
