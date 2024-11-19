import express from "express";
import { login, register, update } from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").post(isAuth , update);
router.route("/deleteUser").post(isAuth , update);


export default router;