import React from "react";
import { useSelector } from "react-redux";

export const Admin = () => {
  //get the user from store
  //check if user is admin
  //if not admin, redirect to home page
  //if admin
  //show admin
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return <div>Admin</div>;
};

export default Admin;
