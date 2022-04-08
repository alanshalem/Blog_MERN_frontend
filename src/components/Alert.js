import React from "react";
import { useGlobalContext } from "../context";

export default function Alert({ postName }) {
  const { closeAlert, confirmDelete } = useGlobalContext();

  const handleConfirmDelete = () => {
    confirmDelete();
    closeAlert();
  };
  return (
    <div className="fixed z-10 top-0 right-0 left-0 bottom-0 grid place-items-center bg-black bg-opacity-50">
      <div className="grid place-items-center relative w-4/5 max-w-md bg-white border-8 border-gray-300 dark:bg-gray-500 dark:border-purple-200 p-5 shadow-md rounded">
        <h3 className="font-semibold  w-full border-b-2 border-gray-300 dark:border-purple-200 p-5 dark:text-gray-100">
          Delete Post
        </h3>
        <p className="text-center p-5 dark:text-gray-100">
          Are you sure you want to delete the post:
          <br />[{postName}]?
        </p>

        <div className="flex gap-5">
          <button className="btn-secondary" onClick={handleConfirmDelete}>
            yes
          </button>
          <button className="btn-secondary" onClick={closeAlert}>
            no
          </button>
        </div>
      </div>
    </div>
  );
}
