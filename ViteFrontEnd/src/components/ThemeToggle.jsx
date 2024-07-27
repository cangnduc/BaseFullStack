import React from "react";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/features/theme/themeSlice";
import { Button } from "@/components/ui/button";
const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme);
 
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <Button onClick={handleToggle} className={`${theme == "light"? "bg-slate-200": ""}`} variant="outline" size="icon">
      {theme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 bg-slate-200" />
      )}
    </Button>
  );
};

export default ThemeToggle;
