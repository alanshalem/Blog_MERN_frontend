import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import Message from "./Message";

export default function ImageInput({
  name,
  onUploadClick,
  handleUploadSelect,
  setSelectorShowing,
  message,
  messageType,
}) {
  const [file, setFile] = useState(null);

  const handleOnChange = (e) => {
    let file = e.target.files[0];

    setFile(file);
    handleUploadSelect(file);
  };
  const handleUploadImage = () => {
    onUploadClick(file);
    setFile(null);
  };
  return (
    <div className="p-5 grid gap-5 justify-center bg-purple-200 dark:bg-transparent  items-center border-2 border-transparent md:ml-2 h-full dark:border-purple-200">
      <div className="text-center">
        <p className="font-semibold">Image</p>
        <p className="pt-2 pb-5">
          Select an existing image or upload a new one.
        </p>
        <div className="flex space-between">
          <p className="border-b-2 border-gray-800 dark:border-gray-300 max-w-60 w-4/5 mx-auto">
            {name}
          </p>
          <button
            type="button"
            className="cursor-pointer hover:text-purple-500 dark:text-gray-300 dark:hover:text-white text-2xl"
            onClick={() => setSelectorShowing(true)}
          >
            <BsImage />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <label
          className="flex mr-5 mb-3 dark:text-gray-400 hover:text-purple-500 dark:hover:text-white cursor-pointer"
          htmlFor="image"
        >
          <FiUpload className="mr-2 text-2xl" />
          {!file && "Choose an image to upload"}
        </label>
        {file && (
          <button
            className="post-input"
            type="button"
            onClick={handleUploadImage}
          >
            Upload:{" "}
            {file &&
              (file.name.length <= 25
                ? file.name
                : `${file.name.substring(0, 25)}...`)}
          </button>
        )}
      </div>
      <input
        className="hidden"
        accept="image/*"
        type="file"
        id="image"
        placeholder="an image"
        onChange={handleOnChange}
      />
      {message && <Message type={messageType}>{message}</Message>}
    </div>
  );
}
