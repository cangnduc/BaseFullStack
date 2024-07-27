import { useState } from "react";
import Home from "./pages/Home/Home";
import "./App.css";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Blog from "./pages/Blog/Blog";
import Admin from "./pages/Admin/Admin";
import Service from "./pages/Service/Service";
import About from "./pages/About/About";
import RequireAuth from "./components/RequireAuth";
import ThemeToggle from "./components/ThemeToggle";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Nav/NavBar";
import LoginSuccess from "./pages/Login/LoginSuccess";
import ProtectedLoginRoute from "./components/ProtectedLoginRoute";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/service" element={<Service />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={
                  <ProtectedLoginRoute>
                    <Login />
                  </ProtectedLoginRoute>
                }
              />
              <Route path="/login/success" element={<LoginSuccess />} />
              <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
                <Route path="/blog" element={<Blog />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
