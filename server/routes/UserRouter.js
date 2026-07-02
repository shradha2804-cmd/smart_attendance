import express from "express";
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  changePassword 
} from "../controller/UserController.js";

const UserRouter = express.Router();

// Routes
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/forgot-password", forgotPassword);
UserRouter.post("/change-password", changePassword);

export default UserRouter;