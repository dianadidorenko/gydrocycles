import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Пользователь не существует",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ succes: true, token });
    } else {
      res.json({ succes: false, message: "Неправильные данные" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "Пользователь уже существуетs",
      });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Введите, пожалуйста, правильный мейл",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Введите пожалуйста как минимум 8 символов",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ succes: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      res.json({ succes: true, token });
    } else {
      res.json({ success: false, message: "Неправильные данные" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Make Favorite
const makeFavorite = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    // Логика добавления в избранное
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Пользователь не найден" });
    }

    const currentFavorites = user.favorites || [];
    if (!currentFavorites.includes(itemId)) {
      currentFavorites.push(itemId);
    }

    await userModel.findByIdAndUpdate(userId, { favorites: currentFavorites });
    res.json({ success: true, message: "Товар добавлен в избранное" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Favorite
const removeFavorite = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.id;

    // Логика удаления из избранного
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Пользователь не найден" });
    }

    const currentFavorites = user.favorites || [];
    const updatedFavorites = currentFavorites.filter((fav) => fav !== itemId);

    await userModel.findByIdAndUpdate(userId, { favorites: updatedFavorites });
    res.json({ success: true, message: "Товар удален из избранного" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List of Favorites by User
const listOfFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const favorites = user.favorites || [];
    res.json({ success: true, favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  makeFavorite,
  removeFavorite,
  listOfFavorites,
};
