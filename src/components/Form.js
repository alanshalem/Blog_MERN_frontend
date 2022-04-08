import axios from "axios";
import React, { useState, useEffect } from "react";
import ComboBox from "../components/ComboBox";
import ImageInput from "../components/ImageInput";
import ImageSelector from "../components/ImageSelector";
import { tagData } from "../data";

export default function Form({ post, submitForm, btnTitle, saveDraft }) {
  const [title, setTitle] = useState("");
  const [imageName, setImageName] = useState("default.jfif");
  const [imagePath, setImagePath] = useState("/images/default.jfif");
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
  const [currentTags, setCurrentTags] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectorShowing, setSelectorShowing] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("default");
  const tagList = tagData
    .filter((tag) => tag.name !== "all")
    .map((tag) => tag.name);

  useEffect(() => {
    if (post) {
      const { image, title, tags, text } = post;
      let name = "";
      setTitle(title);

      setCurrentTags(tags.length);
      let comboBoxes = document.querySelectorAll(".combo-box select");

      tags.forEach((tag, index) => {
        comboBoxes[index].value = tag;
        setTags(...tags, tag);
      });

      if (image.includes("cloudinary")) {
        let list = image.split("/");
        name = list[list.length - 1];
      }
      setImageName(name);
      setImagePath(image);
      setText(text);
    }
  }, [post]);

  useEffect(() => {
    if (selectedImage) {
      setImageName(
        `${selectedImage.public_id.split("/")[1]}.${selectedImage.format}`
      );
      setImagePath(selectedImage.secure_url);
      setImageSource(selectedImage.secure_url);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onloadend = () => {
        setImageSource(reader.result);
      };
    }
  }, [uploadedFile]);

  const updateMessage = (message, type) => {
    setMessage(message);
    if (type) setMessageType(type);
  };

  const uploadImage = async (e) => {
    if (imageSource) {
      //Upload to cloudinary
      try {
        const { data } = await axios.post(
          "/api/cloudinary/upload",
          JSON.stringify({ data: imageSource, file_name: uploadedFile.name }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const url = data.uploadedResponse.secure_url;
        setImageName(uploadedFile.name);
        setImagePath(url);

        updateMessage(
          `Uploaded image ${data.uploadedResponse.public_id}.`,
          "success"
        );
      } catch (error) {
        updateMessage("Upload failed.", "error");
      }
    } else {
      updateMessage("No file to upload", "error");
    }
  };

  const handleComboSelect = (e) => {
    let comboBoxes = document.querySelectorAll(".combo-box select");
    let newTags = [];
    for (let i = 0; i < comboBoxes.length; i++) {
      let val = comboBoxes[i].value;
      if (val !== "none" && !newTags.includes(val)) newTags.push(val);
    }
    setTags(newTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(title, tags, text, imagePath);
  };

  return (
    <form
      className="grid md:grid-cols-2 w-full max-w-2xl"
      onSubmit={handleSubmit}
    >
      {/* Image */}
      <div className="relative h-0 pb-9/16 md:pb-full md:col-start-1 md:mr-2">
        <img
          className="absolute inset-0 w-full object-cover h-full"
          src={imagePath}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/default.jfif";
          }}
          alt="default"
        />
      </div>

      {/* Title Input */}
      <div className="flex flex-col items-center p-5 md:col-start-1 md:row-start-1 md:col-span-2">
        <label
          className="mb-3 dark:text-gray-400 font-semibold"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="post-input text-center w-full"
          type="text"
          id="title"
          placeholder="My Adventure"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="md:col-start-2">
        {/* Image Input */}
        <ImageInput
          name={imageName}
          handleUploadSelect={setUploadedFile}
          onUploadClick={uploadImage}
          setSelectorShowing={setSelectorShowing}
          message={message}
          messageType={messageType}
        />
      </div>

      {/* Image Selector */}
      {selectorShowing && (
        <ImageSelector
          onSetSelected={setSelectedImage}
          setSelectorShowing={setSelectorShowing}
        />
      )}

      {/* Tag Inputs */}
      <div className="flex flex-col items-center p-5 gap-2 w-full md:col-start-1 md:col-span-2">
        <label className="mb-3 dark:text-gray-400 font-semibold" htmlFor="tags">
          Tags
        </label>
        <div className="flex gap-5 justify-center">
          <ComboBox name="tag1" list={tagList} onChange={handleComboSelect} />
          <ComboBox
            name="tag2"
            className="ml-2"
            list={tagList}
            hidden={currentTags < 2}
            onChange={handleComboSelect}
          />
          <ComboBox
            name="tag3"
            className="ml-2"
            list={tagList}
            hidden={currentTags < 3}
            onChange={handleComboSelect}
          />
          {currentTags < 3 && (
            <button
              className="dark:text-white ml-2"
              type="button"
              onClick={() => setCurrentTags(currentTags + 1)}
            >
              +
            </button>
          )}
        </div>
      </div>

      {/* Text Input */}
      <div className="flex flex-col justify-center items-center p-5 w-full md:col-span-2">
        <label className="mb-3 dark:text-gray-400 font-semibold" htmlFor="text">
          Text
        </label>
        <textarea
          className="p-3 w-full resize-none h-60 post-input"
          type="text"
          id="text"
          placeholder="This the start of my adventure."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary w-3/5 mx-auto md:col-span-2">
        {btnTitle}
      </button>
      <button
        type="button"
        className="btn-primary mt-2 px-5 w-3/5 mx-auto md:col-span-2"
        onClick={() =>
          saveDraft(
            title ? title : "[empty]",
            tags,
            text ? text : "[empty]",
            imagePath
          )
        }
      >
        Save draft
      </button>
    </form>
  );
}
