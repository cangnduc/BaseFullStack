const { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } = require("../services/jwt.token.js");
const indexController = {
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(401).json({ message: "Access denied heres", refreshToken });

      const user = verifyRefreshToken(refreshToken);
      if (!user) return res.status(401).json({ message: "Access denied" });
      const accessToken = generateAccessToken({ email: user.email, id: user.id, username: user.username, role: user.role });
      //const newRefreshToken = generateRefreshToken({ email: user.email, id: user.id, username: user.username, role: user.role });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      res.status(200).json({ data: { user, accessToken } });
    } catch (error) {
      res.status(400).json({ message: "Invalid tokensss" });
    }
  },
};
module.exports = {
  indexController,
};
