import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import Moment from "react-moment";

export default function AdminRow({
  document,
  documentPath,
  handleEditDocument,
  handleDeleteDocument,
}) {
  return (
    // Row
    <div
      key={document._id}
      className="grid place-items-center w-4/5 sm:w-full mx-auto py-2 sm:grid-cols-admin-table bg-gray-300 dark:bg-gray-700 mb-2 rounded-md"
    >
      {/* First Column - Title */}
      <div className="lg:w-4/5 p-2 text-center text-xl sm:text-base dark:text-gray-100">
        <Link
          to={`${documentPath}/${document._id}`}
          className="hover:underline "
        >
          {document.title}
        </Link>
      </div>

      {/* Second Column - Tags */}
      <div className="lg:w-4/5 p-2">
        <ul>
          {document.tags
            .slice(0)
            .reverse()
            .map((tag, index) => {
              return (
                <li
                  key={index}
                  className="text-purple-600 dark:text-purple-300 p-1"
                >
                  #{tag}
                </li>
              );
            })}
        </ul>
      </div>

      {/* Third Column - Date */}

      <div className="lg:w-4/5 p-2 dark:text-gray-300">
        <Moment format="MMM DD YYYY" date={document.createdAt} />
      </div>

      {/* Fourth Column - Date */}
      <div className="flex lg:w-4/5 p-2">
        <button
          className="btn-primary-rounded mr-2"
          onClick={() => handleEditDocument(document)}
        >
          <FiEdit className="text-3xl" />
        </button>
        <button
          className="btn-primary-rounded"
          onClick={() => handleDeleteDocument(document)}
        >
          <HiOutlineDocumentRemove className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
