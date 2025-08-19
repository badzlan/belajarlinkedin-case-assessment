import Enrollments from "../model/Enrollment.js";

export const enrollment = async (req, res) => {
   const { id } = req.params;
   const user_id = req.user._id;

   try {
      const exist = await Enrollments.findOne({ user_id, class_id: id });

      if (exist) {
         throw Error("Enrollment exist!");
      }

      await Enrollments.create({ user_id, class_id: id });
      res.status(201).send({ message: "Enrollment successful!" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};
