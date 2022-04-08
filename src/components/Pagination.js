import React from "react";
import { useHistory } from "react-router-dom";
import { handleParams } from "../utils/handleParams";

export default function Pagination({ pages, page, location }) {
  const history = useHistory();
  const handlePageClick = (pageNum) => {
    let updatedURL = handleParams(location, "page", pageNum);
    history.push(`${updatedURL}`);
  };
  return (
    pages > 1 && (
      <div>
        <ul className="flex w-full justify-center mt-5">
          {[...Array(pages).keys()].map((pageNum, index) => {
            return (
              <li
                key={index}
                onClick={() => handlePageClick(pageNum + 1)}
                className={`${
                  Number(page) === pageNum + 1 && "bg-purple-300"
                } m-2 px-2 py-1 rounded bg-gray-300 hover:bg-purple-600 cursor-pointer`}
              >
                {pageNum + 1}
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
}
