import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  makeFavorite,
  listOfFavorites,
  removeFavorite,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/makeFavorite", authUser, makeFavorite);
userRouter.post("/removeFavorite", authUser, removeFavorite);
userRouter.get("/listOfFavorites", authUser, listOfFavorites);

export default userRouter;
