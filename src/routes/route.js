import { Router } from "express";
import Auth from "../middleware/Auth.js";
import * as userController from "../controller/userController.js";
import * as classController from "../controller/classController.js";
import * as enrollmentController from "../controller/enrollmentController.js";

const router = Router();

router.get("/", (req, res) => {
   res.redirect(process.env.API_DOCS);
});

// User
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", Auth, userController.profile);

// Class
router.post("/class", Auth, classController.createClass);
router.get("/class", Auth, classController.getAllClasses);
router.get("/class/:id", Auth, classController.getOneClass);
router.put("/class/:id", Auth, classController.updateClass);
router.delete("/class/:id", Auth, classController.deleteClass);

// Enrollment
router.post("/enroll/:id", Auth, enrollmentController.enrollment);

export default router;
