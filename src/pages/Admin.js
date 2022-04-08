import React from "react";
import { useHistory } from "react-router";
import { useGlobalContext } from "../context";
import { buttonList } from "../data";

export default function Admin() {
  const history = useHistory();
  const { logout } = useGlobalContext();

  return (
    <div className="grid place-items-center w-full dark:bg-gray-600 px-4 py-10 rounded-md max-w-xl">
      <h1 className="mb-5 text-center">Admin Dashboard</h1>
      <p className="text-center">
        Manage posts, drafts and view post statistics!
      </p>

      {/* Admin Buttons */}
      <div className="grid grid-rows-2 grid-flow-col auto-cols-fr  mt-6 ">
        {buttonList.map((item, index) => {
          return (
            <div
              key={index}
              className="grid place-items-center p-6 bg-gray-300 hover:bg-gray-200 dark:bg-gray-700 m-1 cursor-pointer rounded-md dark:text-purple-300 shadow dark:hover:text-purple-200"
              onClick={() => history.push(item.path)}
            >
              <span className="text-4xl">{item.icon}</span>
              <span className="">{item.name}</span>
            </div>
          );
        })}
      </div>
      <button
        className="btn-primary px-4 mt-4"
        onClick={() => {
          logout();
          history.push("/");
        }}
      >
        logout
      </button>
    </div>
  );
}
