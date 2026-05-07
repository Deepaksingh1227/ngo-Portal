import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import axios from "axios";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// 🔹 Helper to verify reCAPTCHA
const verifyCaptcha = async (token) => {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const { data } = await axios.post(url);
    return data.success;
  } catch (err) {
    console.error("Captcha verification error:", err.message);
    return false;
  }
};

// ✅ REGISTER (captcha only for non-admin)
export const register = async (req, res) => {
  const { name, email, password, role, token } = req.body;

  try {
    // 🔹 Skip captcha if role is admin
    if (role !== "admin") {
      const captchaOk = await verifyCaptcha(token);
      if (!captchaOk) {
        return res.status(400).json({ message: "Captcha verification failed" });
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Password validation
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    if (!/^[A-Z]/.test(password)) {
      return res.status(400).json({ message: "Password must start with a capital letter" });
    }
    if (!/@/.test(password)) {
      return res.status(400).json({ message: "Password must contain an '@' symbol" });
    }

    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by User model's pre-save hook
      role,
    });

    if (user) {
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// ✅ LOGIN (captcha only for non-admin)
export const login = async (req, res) => {
  const { email, password, token } = req.body;

  try {
    // 🔹 Hardcoded admin (skip captcha)
    if (email === "admin@ngo.com" && password === "Admin123") {
      let admin = await User.findOne({ email });
      if (!admin) {
        admin = await User.create({
          name: "Admin",
          email,
          password, // Password will be hashed by User model's pre-save hook
          role: "admin",
        });
      }

      return res.json({
        user: {
          _id: admin._id,
          name: admin.name,
          role: admin.role,
          email: admin.email,
        },
        token: generateToken(admin._id),
      });
    }

    // 🔹 For students/donors → verify captcha
    const captchaOk = await verifyCaptcha(token);
    if (!captchaOk) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }

    // Regular users
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        user: {
          _id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};