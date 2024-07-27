const userSchema = require("../models/user.model.js");
const userController = {
  getUserById: async (req, res) => {
    try {
      const id = req.params.id ? req.params.id : 0;
      if (id === 0) {
        return res.status(400).json({ message: "Invalid user id" });
      }

      const user = await userSchema.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (req.user.role !== "admin" && req.user.id !== id) {
        return res.status(403).json({ message: "Not authorized to get other user" });
      }
      res.status(200).json({ message: "User found", user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await userSchema.find();
      res.status(200).json({ message: "Users found", users });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  addUser: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const user = new userSchema({
        username,
        email,
        passwordHash: password,
        role,
      });
      await user.save();
      res.status(201).json({ message: "User added", user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id ? req.params.id : 0;
      if (id === 0) {
        return res.status(400).json({ message: "Invalid user id" });
      }
      const { username, email, password, role } = req.body;
      const user = await userSchema.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (req.user.role !== "admin" && req.user.id !== id) {
        return res.status(403).json({ message: "Not authorized to update other user" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.username = username;
      user.email = email;
      user.passwordHash = hashedPassword;
      user.role = role;
      await user.save();
      res.status(200).json({ message: "User updated", user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id ? req.params.id : 0;
      if (id === 0) {
        return res.status(400).json({ message: "Invalid user id" });
      }
      const user = await userSchema.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      await user.remove();
    } catch (error) {
      res.status(500).json({ message: "internal server error", error });
    }
  },
};

module.exports = { userController };
