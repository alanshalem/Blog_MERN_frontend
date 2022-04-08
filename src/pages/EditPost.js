import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import Message from "../components/Message";
import { useGlobalContext } from "../context";

export default function EditPost() {
  const [post, setPost] = useState(null);
  const { userInfo } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("default");
  const [messageLink, setMessageLink] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/posts/${id}`);
        setPost(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const updateMessage = (message, type, link) => {
    setMessage(message);
    if (type) setMessageType(type);
    if (link) setMessageLink(link);
  };
  const submitEditForm = async (title, tags, text, image) => {
    if (title && tags.length > 0 && text && image) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      try {
        const { data } = await axios.put(
          "/api/posts",
          { id, title, image, tags, text },
          config
        );
        updateMessage(
          `Successfully edited [${title}]`,
          "success",
          `/posts/${data._id}`
        );
      } catch (error) {
        updateMessage(`Error editing post.`, "error");
      }
    } else {
      updateMessage("Fields are not filled in.", "error");
    }
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
        { title, image, tags, text, postId: id },
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

  return (
    <>
      {loading ? (
        <h1>Loading post to edit...</h1>
      ) : !post ? (
        <div className="grid md:grid-cols-2 place-items-center">
          <h1>Can't find the post you want to edit.</h1>
        </div>
      ) : (
        <div className="grid place-items-center">
          <h1 className="mb-10 text-center">Edit Post: {post.title}</h1>
          <Form
            post={post}
            btnTitle={"Edit Post"}
            submitForm={submitEditForm}
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
      )}
    </>
  );
}
