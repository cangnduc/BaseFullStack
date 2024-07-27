import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshMutation } from "@/redux/features/api/apiSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "@/redux/features/auth/authSlice";
import { setCredentials } from "@/redux/features/auth/authSlice";
const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);

  return Date.now() >= exp * 1000;
};
const ProtectedLoginRoute = ({ children }) => {
  const { user, accessToken } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const [refresh, { isLoading, isSuccess, error }] = useRefreshMutation();

//   useEffect(() => {
//     const acb = () => {
//       const checkToken = async () => {
//         try {
//           const result = await refresh().unwrap();

//           dispatch(setCredentials({ user: result.user, accessToken: result.accessToken }));
//         } catch (error) {
//           dispatch(logout());
//         }
//       };

//       if (!accessToken || isTokenExpired(accessToken)) {
//         checkToken();
//       } else if (accessToken && user) {
//         const { email, username, role } = jwtDecode(accessToken);
//         dispatch(setCredentials({ user: { email, username, role }, accessToken }));
//       }
//     };
//   }, [accessToken, dispatch, refresh]);
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
  if (user && accessToken) {

    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedLoginRoute;
