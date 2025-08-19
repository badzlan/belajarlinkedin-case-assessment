import { Router } from "express";
import Auth from "../middleware/Auth.js";
import * as userController from "../controllers/userController.js";
import * as classController from "../controllers/classController.js";
import * as enrollmentController from "../controllers/enrollmentController.js";

const router = Router();

router.get("/", (req, res) => {
   res.redirect(process.env.API_DOCS || "/");
});

// User
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", Auth, userController.profile);

// Class
router.post("/classes", Auth, classController.createClass);
router.get("/classes", Auth, classController.getAllClasses);
router.get("/classes/:id", Auth, classController.getOneClass);
router.put("/classes/:id", Auth, classController.updateClass);
router.delete("/classes/:id", Auth, classController.deleteClass);

// Enrollment
router.post("/enroll", Auth, enrollmentController.enrollment);

export default router;
