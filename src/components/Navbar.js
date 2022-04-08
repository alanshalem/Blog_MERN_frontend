import React, { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { AiOutlineFileAdd, AiOutlineUser } from "react-icons/ai";
import { IoEllipsisHorizontal } from "react-icons/io5";
import DarkModeToggle from "./DarkModeToggle";
import { useGlobalContext } from "../context";
import { iconData } from "../data";
import { NavDropdown } from "../components";
import LangToggle from "./LangToggle";
import { changeLanguage } from "i18next";

export default function Navbar({ isSmallScreenWidth, isSmallScreenHeight }) {
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn, userInfo, logout, theme } = useGlobalContext();
  const [isUserSidebarShowing, setIsUserSidebarShowing] = useState(false);
  const [isUserNavShowing, setIsUserNavShowing] = useState(false);
  const [isCategoryMenuShowing, setIsCategoryMenuShowing] = useState(false);
  const [isSideCategoryMenuShowing, setIsSideCategoryMenuShowing] =
    useState(false);
  let query = history.location.search;
  const [selectedCategory, setSelectedCategory] = useState(
    query.includes("category") ? query.split("=")[1] : ""
  );
  const navContainer = useRef(null);
  const [recentIcons, setRecentIcons] = useState(
    iconData.slice(0, 3).map((icon) => icon.name) || []
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    //Update category icon on location change
    if (query && query.includes("category")) {
      setSelectedCategory(query.split("=")[1]);
    }
  }, [history.location, query]);

  useEffect(() => {
    //Close sidebars & menus on offclick
    document.addEventListener("mousedown", handleOffClick);
    return () => {
      document.removeEventListener("mousedown", handleOffClick);
    };
  }, []);

  const handleNavClick = (category) => {
    if (category === "home") {
      history.push("/");
    } else {
      history.push(`/posts/?category=${category}`);
    }

    //Scroll to top of page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handleCategoryClick = (category) => {
    handleNavClick(category);
    setIsCategoryMenuShowing(false);
    setIsSideCategoryMenuShowing(false);
    setIsUserNavShowing(false);
    setSelectedCategory(category);

    // Update recent icons for sidebar nav
    let newRecentIcons = [...recentIcons];
    let temp = newRecentIcons[1];
    newRecentIcons[1] = category;
    newRecentIcons[2] = temp;
    setRecentIcons(newRecentIcons);
  };

  const handleOffClick = (e) => {
    if (navContainer.current && !navContainer.current.contains(e.target)) {
      // setIsSidebarOpen(false);
    }
    const menu = document.getElementById("user-sidebar-menu");
    if (!menu.contains(e.target)) {
      setIsUserSidebarShowing(false);
    }

    const userNavMenu = document.getElementById("user-nav-menu");
    if (userNavMenu && !userNavMenu.contains(e.target)) {
      setIsUserNavShowing(false);
    }

    const categoryMenu = document.getElementById("category-menu");
    if (categoryMenu && !categoryMenu.contains(e.target)) {
      setIsCategoryMenuShowing(false);
    }

    const sideCategoryMenu = document.getElementById("side-category-menu");
    if (sideCategoryMenu && !sideCategoryMenu.contains(e.target)) {
      setIsSideCategoryMenuShowing(false);
    }
  };

  const handleUserClick = (navType) => {
    if (!isLoggedIn) {
      history.push("/admin");
    } else if (navType === "sidebar") {
      setIsUserSidebarShowing(true);
      //Using the li element for consistency versus the icon
      const userRect = document
        .getElementById("user-icon")
        .getBoundingClientRect();

      const { left, right, top, bottom, width } = userRect;
      const menu = document.getElementById("user-sidebar-menu");

      menu.style.right = `${right - left + width + 5}px`;
      menu.style.bottom = `${bottom - top - 5}px`;
    } else if (navType === "nav") {
      setIsUserNavShowing(true);
      setIsCategoryMenuShowing(false);
    }
  };

  const handleLogoutClick = () => {
    setIsUserSidebarShowing(false);
    setIsUserNavShowing(false);
    logout();
    history.push("/");
  };

  const handleDashboardClick = () => {
    setIsUserSidebarShowing(false);
    setIsUserNavShowing(false);
    history.push("/admin");
  };

  return (
    <header className="transparent md:max-w-5xl mx-auto">
      {!isSmallScreenWidth && (
        <div className="absolute font-display font-bold text-gray-700 dark:text-purple-300 p-5">
          <Link to="/">alanshalem.blog</Link>
        </div>
      )}

      {/* Mobile/Small screen Navbar */}
      {isSmallScreenWidth ? (
        <nav className="fixed flex items-center py-4 px-6 bg-black bg-opacity-60 z-10 w-full top-0 left-0">
          <span
            className="mr-4 cursor-pointer"
            onClick={() => {
              history.push("/");
              setSelectedCategory("");
            }}
          >
            <img src="/favicon-32x32.png" alt="feather logo" />
          </span>
          <div className="flex items-center justify-end w-full">
            {/* Category Select */}
            <div className="relative mx-2">
              <span
                className="nav-icon"
                onClick={() => setIsCategoryMenuShowing(true)}
              >
                {selectedCategory
                  ? iconData.find((icon) => icon.name === selectedCategory).icon
                  : iconData.find((icon) => icon.name === "home").icon}
              </span>

              {/* Category Menu Modal */}
              <NavDropdown
                isShowing={isCategoryMenuShowing}
                itemList={iconData}
                filteredItems={["home"]}
                onClick={handleCategoryClick}
                id="category-menu"
                location={"bottom"}
              />
            </div>
            {/* User dropdown select for small screens */}
            <div className="relative mx-2">
              <AiOutlineUser
                className="nav-icon mx-2"
                onClick={() => handleUserClick("nav")}
              />
              <ul
                className={`absolute bg-black z-20 opacity-80 text-white p-4 rounded-md mt-5 top-full -left-1/4 ${
                  !isUserNavShowing && "hidden"
                }`}
                id="user-nav-menu"
              >
                <li className="py-1 px-2">
                  <strong>{userInfo.username}</strong>
                </li>
                <li
                  className="hover:text-purple-300 py-1 px-2 cursor-pointer"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </li>
                <li
                  className="hover:text-purple-300 py-1 px-2 cursor-pointer"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <DarkModeToggle compact />
              <LangToggle compact />
            </div>
          </div>
        </nav>
      ) : (
        <nav
          className={`fixed grid grid-cols-2 right-0 h-full place-items-center justify-center z-10 pointer-events-none ${
            !isSidebarOpen && "transform translate-x-1/2"
          } transition duration-500 ease-in-out`}
        >
          {/* Arrow Slide Bar */}
          <div className="relative flex h-full pointer-events-auto">
            <div className="bg-black bg-opacity-60 rounded-full p-2 shadow-md self-center">
              {isSidebarOpen ? (
                <>
                  <FiArrowRightCircle
                    onClick={() => setIsSidebarOpen(false)}
                    className="nav-icon"
                  />
                  <LangToggle className="mb-4" />
                </>
              ) : (
                <>
                  <FiArrowLeftCircle
                    onClick={() => setIsSidebarOpen(true)}
                    className="nav-icon"
                  />
                  <LangToggle className="mb-4" />
                </>
              )}
            </div>
            {!isSmallScreenHeight && (
              <ul className="bg-black bg-opacity-60 rounded-full p-2 shadow-md absolute bottom-5 right-0 pointer-events-auto">
                {isLoggedIn && (
                  <li onClick={() => history.push("/admin/new-post")}>
                    <AiOutlineFileAdd className="nav-icon mb-5" />
                  </li>
                )}
                <li id="user-icon" onClick={() => handleUserClick("sidebar")}>
                  <AiOutlineUser className="nav-icon" />
                </li>
              </ul>
            )}
          </div>

          {/* Nav Icons */}
          <div
            className={`relative grid bg-black bg-opacity-50 pointer-events-auto h-full pt-44`}
            ref={navContainer}
          >
            <DarkModeToggle />

            {!isSmallScreenHeight ? (
              <ul className="flex flex-col grid-start-2 p-5 pointer-events-auto">
                {iconData.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="nav-icon mb-4"
                      onClick={() => {
                        handleNavClick(item.name);
                      }}
                    >
                      {item.icon}
                    </li>
                  );
                })}
              </ul>
            ) : (
              // Shortened nav icons for smaller screen height
              <ul className="flex flex-col grid-start-2 p-5 pointer-events-auto">
                {recentIcons.map((name, index) => {
                  let icon = iconData.find((icon) => icon.name === name);
                  return (
                    <li
                      key={index}
                      className="nav-icon mb-4"
                      onClick={() => {
                        handleNavClick(icon.name);
                      }}
                    >
                      {icon.icon}
                    </li>
                  );
                })}
                <li className="nav-icon mb-4">
                  <IoEllipsisHorizontal
                    onClick={() => setIsSideCategoryMenuShowing(true)}
                  />
                  <NavDropdown
                    isShowing={isSideCategoryMenuShowing}
                    itemList={iconData}
                    filteredItems={["home"]}
                    onClick={handleCategoryClick}
                    id="side-category-menu"
                    location={"left"}
                  />
                </li>
                <li id="user-icon" onClick={() => handleUserClick("sidebar")}>
                  <AiOutlineUser className="nav-icon" />
                </li>
              </ul>
            )}
          </div>
        </nav>
      )}

      {/* User Menu for the Sidebar */}
      <ul
        id="user-sidebar-menu"
        className={` fixed bg-black z-20 opacity-80 text-white rounded-md ${
          !isUserSidebarShowing && "hidden"
        }`}
      >
        <li className="py-1 px-2">
          <strong>{userInfo.username}</strong>
        </li>
        <li
          className="hover:text-purple-300 py-1 px-2 cursor-pointer"
          onClick={handleDashboardClick}
        >
          Dashboard
        </li>
        <li
          className="hover:text-purple-300 py-1 px-2 cursor-pointer"
          onClick={handleLogoutClick}
        >
          Logout
        </li>
      </ul>
    </header>
  );
}
