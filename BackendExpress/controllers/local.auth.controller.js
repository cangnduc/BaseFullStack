const { ZodSchema, z } = require("zod");
const { registerSchema, loginSchema } = require("../validators/zodValidator.js");
const { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } = require("../services/jwt.token.js");
const userSchema = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const localAuthController = {
  loginUser: async (req, res) => {
    try {
      loginSchema.parse(req.body);
      const { email, password } = req.body;
      const user = await userSchema.findOne({ email });
     
      if (!user || user.hashedPassword === null) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const validPassword = bcrypt.compare(password, user.passwordHash);
     
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const accessToken = generateAccessToken({ email: user.email, id: user._id, username: user.username, role: user.role });
      const refreshToken = generateRefreshToken({ email: user.email, id: user._id, username: user.username, role: user.role });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      //wait for 2 seconds to simulate a slow server
      //await new Promise((resolve) => setTimeout(resolve,2000));
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          picture: user.picture ? user.picture : null,
        },
        accessToken,
      });
    } catch (error) {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    }
  },
  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out" });
  },
  registerUser: async (req, res) => {
    try {
      registerSchema.parse(req.body);
      const { username, email, password } = req.body;

      const user = await userSchema.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userSchema({
        username,
        email,
        passwordHash: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User created", newUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors,
        });
      }
      // Handle validation errors
      res.status(500).json({ message: "Internal server errors", error });
    }
  },
};
module.exports = {
  localAuthController,
};
