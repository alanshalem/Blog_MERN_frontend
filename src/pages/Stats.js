import React from "react";
import { useHistory } from "react-router-dom";
export default function Stats() {
  const history = useHistory();
  return (
    <div className="grid place-items-center w-full dark:bg-gray-600 py-10 rounded-md">
      <h1 className="mb-5">Admin Dashboard</h1>
      <p>All post stats -- coming soon!</p>
      {/* All Drafts Container */}
      <div className="p-10 w-full max-w-5xl">
        <h2 className="border-b-2 pb-2 m-2">Stats</h2>
      </div>
      <button
        className="btn-primary px-4 mt-4"
        onClick={() => {
          history.push("/admin");
        }}
      >
        Back to Menu
      </button>
    </div>
  );
}
