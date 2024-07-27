const axios = require("axios");

const getGoogleUrl = () => {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  const options = {
    response_type: "code",
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    scope: "email profile",
    prompt: "consent",
    access_type: "offline",
  };
  url.search = new URLSearchParams(options).toString();
  return url.toString();
};
const getGoogleAccountFromCode = async (code) => {
  // using axios to make a post request to google
  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};
const getGoogleAccountInfo = async (id_token, access_token) => {
  const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });
  console.log(response.data);
  return response.data;
};
module.exports = {
  getGoogleUrl,
  getGoogleAccountFromCode,
  getGoogleAccountInfo,
};
