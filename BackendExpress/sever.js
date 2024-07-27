const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

var compression = require("compression");
dotenv = require("dotenv").config();
const connect = require("./config/mongoose.db.js");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler.js");
const { isLogin } = require("./middlewares/auth.middleware.js");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Custom token to log only error responses

// Custom format to log error responses

// Use morgan with the custom format

// middleware
app.use(compression());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
///routes
app.use(isLogin);
app.use("/api", require("./routes/index.js"));
//app.use("/api/auth", require("./routes/auth.js"));
app.use(errorHandler);

// run server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  await connect();

  console.log("Server is running on port 3000");
});
