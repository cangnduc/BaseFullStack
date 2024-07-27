// src/middleware/errorHandler.js
const z = require("zod");
const errorHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ errors: err.errors });
  }
  console.log(req.file)
  res.status(500).json({ message: "Internal server error" , error: err });
};

module.exports = errorHandler;
