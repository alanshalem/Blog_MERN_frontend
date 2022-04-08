import React from "react";

export default function Loader() {
  return (
    <div className="p-5">
      <div className="grid relative place-items-center  animate-pulse py-10">
        <div className="absolute bg-purple-400 w-10 h-10 transform rotate-45"></div>
        <div className="absolute bg-purple-300 w-10 h-10 transform -rotate-45 -translate-x-3/4 -translate-y-3/4 rounded-t-full"></div>
        <div className="absolute bg-purple-300 w-10 h-10 transform rotate-45 translate-x-3/4 -translate-y-3/4 rounded-t-full"></div>
      </div>
      <p className="text-center">Loading the page...</p>
    </div>
  );
}
