import axios from "axios";
import React, { useState } from "react";
import Form from "../components/Form";
import Message from "../components/Message";
import { useGlobalContext } from "../context";

export default function NewPost() {
  const { userInfo } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("default");
  const [messageLink, setMessageLink] = useState("");

  const updateMessage = (message, type, link) => {
    setMessage(message);
    if (type) setMessageType(type);
    if (link) setMessageLink(link);
  };

  const saveDraft = async (title, tags, text, image) => {
    setLoading(true);
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/drafts",
        { title, image, tags, text },
        config
      );

      updateMessage(
        `Successfully created draft: ${title}`,
        "success",
        `/admin/drafts/${data._id}`
      );
      setLoading(false);
    } catch (error) {
      if (error.response.status === 400) {
        updateMessage(error.response.data.message, "error");
      } else if (error.response.status === 401) {
        updateMessage("Unauthorized to create drafts.", "error");
      }
      setLoading(false);
    }
  };
  const submitForm = async (title, tags, text, image) => {
    if (title && image && tags.length > 0 && text && image) {
      setLoading(true);
      try {
        let config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/posts",
          { title, image, tags, text },
          config
        );

        updateMessage(
          `Successfully created post: ${title}`,
          "success",
          `/posts/${data._id}`
        );
        setLoading(false);
      } catch (error) {
        if (error.response.status === 400) {
          updateMessage(error.response.data.message, "error");
        } else if (error.response.status === 401) {
          updateMessage("Unauthorized to create posts.", "error");
        }
        setLoading(false);
      }
    } else {
      updateMessage("Fields are not filled in.", "error");
    }
  };

  return (
    <div className="grid place-items-center">
      <h1 className="mb-10 text-center">New Post</h1>
      <Form
        btnTitle={"Create Post"}
        submitForm={submitForm}
        saveDraft={saveDraft}
      />
      <div>
        {loading ? (
          <p>loading...</p>
        ) : (
          message && (
            <Message type={messageType} link={messageLink}>
              {message}
            </Message>
          )
        )}
      </div>
    </div>
  );
}
