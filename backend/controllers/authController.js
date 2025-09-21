import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// ✅ REGISTER
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      res.status(201).json({
        user,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// ✅ LOGIN (with hardcoded ADMIN)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check for hardcoded admin
    if (email === "admin@ngo.com" && password === "Admin123") {
      // see if admin already exists in DB
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
        user: admin,
        token: generateToken(admin._id),
      });
    }

    // regular users
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        user,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
