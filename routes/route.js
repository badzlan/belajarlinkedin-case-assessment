import { Router } from "express";
import * as userController from "../controller/userController.js";

const router = Router();

router.get("/", (req, res) => {
   res.send("Hello world");
});

// User
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;