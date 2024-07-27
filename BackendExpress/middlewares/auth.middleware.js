// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.model.js");
const e = require("express");
const authenticated = (role = null) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        req.user = null;
        if (role) return res.status(401).json({ message: "Unauthorized" });
        next();
      }
      jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
        if (err) {
          req.user = null;
          if (role) return res.status(401).json({ message: "Unauthorized", error: err });
          return next();
        }
        const user = await userSchema.findById(decoded.id);
        if (!user) {
          req.user = null;
          if (role) return res.status(401).json({ message: "Unauthorized" });
          return next();
        }
        if (role === "admin" && user.role !== "admin") {
          return res.status(403).json({ message: "Not authorized as an admin" });
        }
        if (role === "user" && user.role === "null") {
          return res.status(403).json({ message: "Not authorized as an user" });
        }
        next();
      });
    } catch (error) {
      req.user = null;
      if (role) return res.status(401).json({ message: "Unauthorized" });
      next();
    }
  };
};

const isLogin =  async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    //if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        req.user = null;
        return next();
      }

      const user = await userSchema.findById(decoded.id);
      if (!user) {
        req.user = null;
        return next();
      }

      req.user = user;
      next();
    });
  } catch (error) {
    req.user = null;
    next();
  }
};
const isUser = async (req, res, next) => {
  if (req.user?.role === "user" || req.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as an user" });
};

const isAdmin = async (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as an admin" });
};
const autherized = (role = []) => {
  return async (req, res, next) => {
    if (role.includes(req.user?.role)) {
      return next();
    }
    return res.status(403).json({ message: "User Role Not Authorized" });
  };
};
module.exports = { autherized,authenticated, isUser, isLogin, isAdmin };
