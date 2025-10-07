// backend/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import axios from "axios";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "dev_jwt_secret", {
    expiresIn: "30d",
  });

// 🔹 Helper to verify reCAPTCHA (robust, logs response)
const verifyCaptcha = async (token) => {
  try {
    if (!token) {
      console.warn("verifyCaptcha called without token");
      return false;
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not set in environment");
      return false;
    }

    const url = "https://www.google.com/recaptcha/api/siteverify";

    // Use URL-encoded body (the standard expected by Google)
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);

    const { data } = await axios.post(url, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 5000,
    });

    // Helpful debug log (remove or reduce in production)
    console.log("reCAPTCHA response:", data);

    // Google returns { success: true/false, 'error-codes': [...] }
    return data && data.success === true;
  } catch (err) {
    console.error("Captcha verification error:", err?.response?.data || err.message);
    return false;
  }
};

// ✅ REGISTER (captcha only for non-admin)
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Accept token from several possible places
    const token = req.body.token || req.body.captchaToken || req.headers["x-captcha-token"];

    // For non-admin roles, ensure token exists and verifies
    if (role !== "admin") {
      if (!token) {
        return res.status(400).json({ message: "Captcha token missing" });
      }
      const captchaOk = await verifyCaptcha(token);
      if (!captchaOk) {
        return res.status(400).json({ message: "Captcha verification failed" });
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      return res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Registration failed:", error);
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// ✅ LOGIN (captcha only for non-admin)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.body.token || req.body.captchaToken || req.headers["x-captcha-token"];

    // Hardcoded admin (skip captcha)
    if (email === "admin@ngo.com" && password === "Admin123") {
      let admin = await User.findOne({ email });
      if (!admin) {
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = await User.create({
          name: "Admin",
          email,
          password: hashedPassword,
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

    // For non-admin users, require captcha token and verify it
    if (!token) {
      return res.status(400).json({ message: "Captcha token missing" });
    }
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
    console.error("Login failed:", error);
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};
