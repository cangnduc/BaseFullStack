// components/GoogleLoginButton.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/redux/features/auth/authSlice"; // Update the import path according to your project structure
import { Navigate } from "react-router-dom";
import axios from "axios";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
    </button>
  );
};

export default GoogleLoginButton;

// // components/GoogleLoginButton.js
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { setCredentials } from "@/redux/features/auth/authSlice";
// //import { setCredentials } from "../../redux/features/auth/authSlice";
// import { useGoogleLoginMutation } from "@/redux/features/api/googleSlice";

// const GoogleLoginButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [googleLogin, { isLoading }] = useGoogleLoginMutation();

//   const handleGoogleLogin = async () => {
//     window.location.href = "http://localhost:3000/api/auth/google";
//   };
//   const handleGoogleCallback = async () => {
//     const url = new URL(window.location.href);
//     const code = url.searchParams.get("code");

//     if (code) {
//       try {
//         const result = await axios.get(`http://localhost:3000/api/auth/google/callback?code=${code}`, { withCredentials: true });
//         if (result.data) {
//           const { user, accessToken } = result.data;
//           // Store the tokens and user data
//           dispatch(setCredentials({ user, accessToken }));
//           // Redirect to homepage or dashboard
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Failed to log in with Google", error);
//       }
//     }
//   };
//   const handleGoogleCallbackv1 = async () => {
//     const url = new URL(window.location.href);
//     const user = url.searchParams.get("user");
//     const accessToken = url.searchParams.get("accessToken");
//     const refreshToken = url.searchParams.get("refreshToken");

//     if (user && accessToken) {
//       // Parse user data
//       const parsedUser = JSON.parse(decodeURIComponent(user));

//       // Store the tokens and user data
//       dispatch(setCredentials({ user: parsedUser, accessToken }));
//       document.cookie = `refreshToken=${refreshToken};path=/;HttpOnly`;

//       // Redirect to homepage or dashboard
//       navigate("/");
//     }
//   };
//   useEffect(() => {
//     handleGoogleCallback();
//   }, []);
//   return (
//     <button
//       onClick={handleGoogleLogin}
//       className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
//     >
//       <img className="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
//     </button>
//   );
// };

// export default GoogleLoginButton;
