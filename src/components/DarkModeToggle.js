import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useGlobalContext } from "../context";

export default function DarkModeToggle({ compact }) {
  const { theme, toggleTheme } = useGlobalContext();

  if (compact) {
    return (
      <div
        className="flex flex-col items-center justify-self-center cursor-pointer px-5"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <FiMoon className="text-2xl text-purple-300  hover:text-white" />
        ) : (
          <FiSun className="text-2xl text-purple-300  hover:text-white" />
        )}
      </div>
    );
  }
  return (
    <div className="absolute flex flex-col items-center justify-self-center py-5">
      <FiSun className="text-2xl mb-3 text-white dark:text-purple-300" />
      <div className=" grid justify-center bg-gray-200 rounded-full border-gray-200 w-9 h-16 dark:bg-gray-500">
        {/* Toggle button */}
        <div
          className={`bg-white w-7 h-7 my-1 rounded-full  cursor-pointer transform ${
            theme === "dark" && "transform translate-y-full"
          } transition duration-800 ease-linear dark:bg-purple-200`}
          onClick={toggleTheme}
        ></div>
      </div>
      <FiMoon className="text-2xl mt-3 text-white dark:text-purple-300" />
    </div>
  );
}
