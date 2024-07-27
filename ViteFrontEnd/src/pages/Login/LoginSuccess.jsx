import React from "react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setCredentials } from "@/redux/features/auth/authSlice";
const LoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasLoginChecked = useRef(false);
  const handleGoogleCallback = async () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    console.log("code", code);
    if (code) {
      try {
        const result = await axios.get(`http://localhost:3000/api/auth/google/success?code=${code}`, { withCredentials: true });
        console.log("result", result);
        if (result.data) {
          const { user, accessToken } = result.data;
          console.log("user", user);
          console.log("accessToken", accessToken);
          // Store the tokens and user data
          dispatch(setCredentials({ user, accessToken }));
          // Redirect to homepage or dashboard

          navigate("/"); // Correct way to programmatically navigate
        }
      } catch (error) {
        console.error("Failed to log in with Google", error);
      }
    }
  };

  useEffect(() => {
    if (!hasLoginChecked.current) {
      handleGoogleCallback();
      hasLoginChecked.current = true;
    }
  }, []);
  return <div>Loading...</div>;
};

export default LoginSuccess;
