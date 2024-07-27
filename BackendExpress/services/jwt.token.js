const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN;

const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "2m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvcmtpbmdhdGdlbXMxQGdtYWlsLmNvbSIsImlkIjoiNjY5M2Q2MjVkZmNhYTNhODgzYmFhYTE5IiwidXNlcm5hbWUiOiJjYW5nIE5ndXllbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMjA4OTAwOSwiZXhwIjoxNzIyMDg5MDI0fQ.0eqIwQIBM_tSkRq66Zf12X2QaqGd-1fBT8-wAqmhbYg