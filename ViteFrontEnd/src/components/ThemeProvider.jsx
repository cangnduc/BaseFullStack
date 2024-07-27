// components/ThemeProvider.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return <div className={theme === "dark" ? "dark" : ""}>{children}</div>;
};

export default ThemeProvider;
