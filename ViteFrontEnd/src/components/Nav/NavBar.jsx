import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";
import "./navbar.css";

const Navbar = () => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const [signout] = useLogoutMutation();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "nav-item-current" : "nav-item";
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsUserOpen(false);
      }
    };

    if (isUserOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserOpen]);

  const toggleDropdown = () => {
    setIsUserOpen(!isUserOpen);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsUserOpen(false);
    setIsMenuOpen([(pre) => !pre]);
  };

  useEffect(() => {
    const updateDropdownPosition = () => {
      if (isUserOpen && buttonRef.current && dropdownRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        dropdownRef.current.style.top = `${rect.bottom + window.scrollY + 5}px`;
        dropdownRef.current.style.left = `${window.innerWidth * 0.98 - dropdownRef.current.offsetWidth}px`;
      }
    };
    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);
    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [isUserOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to={"/"} className="navbar-link">
            <span className="navbar-title">cangnduc</span>
          </Link>
          <div className="theme-toggle md:order-2">
            <ThemeToggle />
            {user ? (
              <button type="button" className="user-button" id="user-menu-button" aria-expanded={isUserOpen} onClick={toggleDropdown} ref={buttonRef}>
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={user.picture ? user.picture : "/docs/images/people/profile-picture-3.jpg"} alt="user photo" />
              </button>
            ) : (
              <Link to="/login" className="nav-item">
                Login
              </Link>
            )}

            <button data-collapse-toggle="navbar-user" type="button" className="menu-button" aria-controls="navbar-user" aria-expanded={isMenuOpen} onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`nav-menu ${isMenuOpen ? "flex" : "hidden"} md:flex md:w-auto md:order-1`} id="navbar-user">
            <ul className="nav-menu">
              <li>
                <Link to="/" className={`nav-item ${getNavLinkClass("/")} `} aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`nav-item ${getNavLinkClass("/about")} `}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/service" className={`nav-item ${getNavLinkClass("/service")} `}>
                  Service
                </Link>
              </li>{" "}
              <li>
                <Link to="/blog" className={`nav-item ${getNavLinkClass("/blog")} `}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isUserOpen && (
        <div ref={dropdownRef} className={`user-dropdown ${isUserOpen ? "user-dropdown-open" : ""}`} id="user-dropdown">
          <div className="user-info">
            <span className="user-info-name">{user?.username}</span>
            <span className="user-info-email">{user?.email}</span>
          </div>
          <ul className="user-menu">
            <li>
              {user?.role == "admin" ? (
                <Link to="/admin" className="user-menu-item">
                  Admin
                </Link>
              ) : (
                <Link to="/my-blogs" className="user-menu-item">
                  My Blogs
                </Link>
              )}
            </li>
            <li>
              <a href="#" className="user-menu-item">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="user-menu-item">
                Earnings
              </a>
            </li>
            <li>
              <Link
                to="/"
                onClick={async () => {
                  await signout();
                  dispatch(logout());
                  setIsUserOpen((pre) => !pre);
                }}
                className="user-menu-item"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
