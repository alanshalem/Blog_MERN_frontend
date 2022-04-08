import React from "react";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Message({ type, children, link }) {
  return (
    <div
      className={`mt-5 text-gray-100 text-center p-2 px-5 rounded ${
        type === "error" && `bg-red-500`
      }
        ${type === "success" && `bg-purple-500`}
        flex justify-center items-center gap-5`}
    >
      {type === "success" ? (
        <BiCheckCircle className="text-4xl text-white" />
      ) : (
        <BiXCircle className="text-4xl text-white" />
      )}
      {children}
      {link && (
        <Link
          className="bg-white px-1 rounded text-purple-500 hover:text-purple-700 hover:bg-purple-100"
          to={link}
        >
          View post
        </Link>
      )}
    </div>
  );
}
