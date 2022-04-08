import React from "react";

export default function NavDropdown({
  isShowing,
  itemList,
  filteredItems,
  onClick,
  id,
  location,
}) {
  return (
    <div>
      <ul
        className={`absolute bg-black z-20 opacity-80 p-4 rounded-md mt-5 
          ${location === "left" ? "bottom-5 right-4/3" : "top-full -left-1/4"} 
          ${!isShowing && "hidden"}`}
        id={id}
      >
        {itemList
          .filter((item) => filteredItems.includes(item.name) === false)
          .map((item, index) => {
            return (
              <li
                key={index}
                className="flex items-center text-white hover:text-purple-300 text-lg cursor-pointer"
                onClick={() => onClick(item.name)}
              >
                <span className="mr-2 text-2xl">{item.icon}</span>
                {item.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
