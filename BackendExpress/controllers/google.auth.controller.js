const { getGoogleUrl, getGoogleAccountFromCode, getGoogleAccountInfo } = require("../services/googleAuth.service.js");
const userSchema = require("../models/user.model.js");
const { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } = require("../services/jwt.token.js");
const googleAuthController = {};

googleAuthController.auth = (req, res) => {
  res.send("Auth route");
};
googleAuthController.googleLogin = (req, res) => {
  const url = getGoogleUrl();
  res.redirect(url);
};
googleAuthController.googleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      res.status(400).json({
        message: "Error",
      });
    }
    return res.redirect(`http://localhost:5173/login/success?code=${code}`);
    const { id_token, access_token } = await getGoogleAccountFromCode(code);
    const { id, email, name, picture, verified_email } = await getGoogleAccountInfo(id_token, access_token);

    if (!verified_email) {
      res.status(400).json({
        message: "Your email is not verified!",
      });
    }
    // find user in database if not create a new user
    let user = await userSchema.findOne({ googleId: id });

    if (!user) {
      user = new userSchema({
        email,
        username: name,
        picture,
        googleId: id,
      });

      await user.save();
    }

    const accessToken = generateAccessToken({ email: user.email, id: user._id, username: user.username, role: user.role });
    const refreshToken = generateRefreshToken({ email: user.email, id: user._id, username: user.username, role: user.role });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
      sameSite: "Strict",
    });

    // Return user data and access token as JSON

    // Redirect back to frontend with the code as query parameter
    //res.redirect(`http://localhost:5173/auth/google/callback?code=${code}`);
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, username: user.username, role: user.role, picture: user.picture ? user.picture : null },
      accessToken,
    });
    // res.redirect(`http://localhost:5173/login?user=${encodeURIComponent(JSON.stringify(user))}&accessToken=${accessToken}&refreshToken=${refreshToken}`);
    // res.status(200).json({
    //   message: "Login successful",
    //   user: {
    //     email: user.email,
    //     username: user.username,
    //     role: user.role,
    //     picture: user.picture ? user.picture : null,
    //   },
    //   accessToken,
    // });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};
googleAuthController.googleSuccess = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      res.status(400).json({
        message: "Errors",
      });
    }
    console.log("code", code);
    const { id_token, access_token } = await getGoogleAccountFromCode(code);
    const { id, email, name, picture, verified_email } = await getGoogleAccountInfo(id_token, access_token);
    console.log("email", email);
    if (!verified_email) {
      res.status(400).json({
        message: "Your email is not verified!",
      });
    }
    // find user in database if not create a new user
    let user = await userSchema.findOne({ googleId: id });

    if (!user) {
      user = new userSchema({
        email,
        username: name,
        picture,
        googleId: id,
      });

      await user.save();
    }

    const accessToken = generateAccessToken({ email: user.email, id: user._id, username: user.username, role: user.role });
    const refreshToken = generateRefreshToken({ email: user.email, id: user._id, username: user.username, role: user.role });
    res.cookie("refreshToken", req.query.refreshToken, {
      httpOnly: true,
    });

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
    res.status(400).json({
      message: "Error",
      error,
    });
  }
};
module.exports = {
  googleAuthController,
};
