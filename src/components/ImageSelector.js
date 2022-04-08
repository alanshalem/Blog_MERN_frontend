import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ImageSelector({ onSetSelected, setSelectorShowing }) {
  const [selected, setSelected] = useState(null);
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await axios.get("/api/cloudinary");
        setImages(data.resources);
        if (data.resources[0]) {
          setPreviewImage(data.resources[0].url);
          setSelected(data.resources[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  const handleClickItem = (image) => {
    setPreviewImage(image.url);
    setSelected(image);
  };
  const handleConfirmClick = () => {
    onSetSelected(selected);
    setSelectorShowing(false);
    setImages([]);
  };
  return (
    <div className="fixed z-10 top-0 right-0 bottom-0 left-0 grid place-items-center">
      <div className="grid bg-white dark:bg-gray-500 border-8 border-gray-300 dark:border-purple-200 w-4/5 max-w-2xl mx-auto my-5 px-5 py-10 rounded-md shadow-md">
        <h2 className="text-2xl text-center pb-5 border-b-2 border-gray-300 dark:border-purple-200 font-semibold">
          Select an Image
        </h2>
        <div className="grid sm:grid-cols-2 p-5 h-72">
          <img
            className="object-cover h-32 sm:h-60 w-full rounded"
            src={previewImage}
            alt={selected ? selected.public_id : ""}
          />
          <ul className="list-none mt-2 sm:mt-0 sm:ml-2 sm:mr-5 overflow-y-scroll overscroll-y-contain pr-2">
            {images &&
              images.map((image, index) => {
                return (
                  <li
                    key={index}
                    className={`rounded-md bg-gray-200 mb-1 p-2 cursor-pointer hover:bg-gray-300 ${
                      selected &&
                      selected.asset_id === image.asset_id &&
                      "bg-purple-200 hover:bg-purple-300"
                    }`}
                    onClick={() => handleClickItem(image)}
                  >
                    {`${image.public_id.split("/")[1]}.${image.format}`}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="flex justify-center sm:mt-5">
          <button
            id="select-btn"
            className="btn-secondary w-20"
            onClick={handleConfirmClick}
          >
            ok
          </button>
          <button
            className="btn-secondary w-20 ml-10"
            onClick={() => setSelectorShowing(false)}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
