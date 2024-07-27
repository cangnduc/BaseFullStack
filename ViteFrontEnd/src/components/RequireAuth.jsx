import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "@/utils/authUtils";
import { useRefreshMutation } from "@/redux/features/api/apiSlice";
import { logout, setCredentials } from "@/redux/features/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const { user, accessToken, isAuthenticated } = useSelector((state) => state.auth);
  const userRole = user?.role;
  const [refresh, { isLoading }] = useRefreshMutation();
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const hasCheckedAuth = useRef(false);
  useEffect(() => {
    const checkToken = async () => {
      if (accessToken && isTokenExpired(accessToken)) {
        try {
          
          const result = await refresh().unwrap();
        
          dispatch(setCredentials({ user: result.data.user, accessToken: result.data.accessToken }));
        } catch (error) {
          
          dispatch(logout());
        }
      }
      
      setIsAuthChecked(true);
    };

    if (!hasCheckedAuth.current) {
      checkToken();
      hasCheckedAuth.current = true;
    }
  }, [user, accessToken, dispatch, refresh]);

  if (isLoading || !isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole.toLowerCase()))) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;
