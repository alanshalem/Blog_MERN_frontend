import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {}
  );
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("default");
  const [messageLink, setMessageLink] = useState("");

  const updateMessage = (text, type, link) => {
    setMessage(text);
    setMessageType(type);
    setMessageLink(link);
  };

  useEffect(() => {
    // Check if there is a user already logged in
    let data =
      localStorage.getItem("userInfo") &&
      JSON.parse(localStorage.getItem("userInfo"));
    if (data) {
      setUserInfo(data);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    } else {
      if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
        setTheme("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  const confirmDelete = () => {
    setIsConfirmDelete(true);
  };

  const closeAlert = () => {
    setIsAlertShowing(false);
  };
  const showAlert = () => {
    setIsAlertShowing(true);
  };

  const login = async (username, password) => {
    //Verify password
    try {
      const { data } = await axios.post("/api/users/login", {
        username,
        password,
      });
      setUserInfo(data);
      setIsLoggedIn(true);
      //save user & token to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage("Error logging in");
    }
  };
  const logout = () => {
    setUserInfo({});
    setIsLoggedIn(false);
    localStorage.removeItem("userInfo");
  };

  return (
    <AppContext.Provider
      value={{
        login,
        userInfo,
        isLoggedIn,
        logout,
        confirmDelete,
        isConfirmDelete,
        setIsConfirmDelete,
        showAlert,
        closeAlert,
        isAlertShowing,
        toggleTheme,
        theme,
        loading,
        setLoading,
        updateMessage,
        message,
        messageType,
        messageLink,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
