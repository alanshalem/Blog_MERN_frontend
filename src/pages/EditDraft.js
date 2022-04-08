import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import Message from "../components/Message";
import { useGlobalContext } from "../context";

export default function EditDraft() {
  const [draft, setDraft] = useState(null);
  const { userInfo } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("default");
  const [messageLink, setMessageLink] = useState("");

  useEffect(() => {
    const fetchDraft = async () => {
      setLoading(true);
      try {
        let config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/drafts/${id}`, config);
        setDraft(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchDraft();
  }, [id, userInfo.token]);

  const updateMessage = (message, type, link) => {
    setMessage(message);
    if (type) setMessageType(type);
    if (link) setMessageLink(link);
  };
  const publishDraft = async (title, tags, text, image) => {
    //Check if the draft is for an existing post. Instead of making a new post, update the existing post and delete the draft.

    if (title && image && tags.length > 0 && text && image) {
      setLoading(true);
      if (draft.postId) {
        try {
          const { data } = await axios.get(`/api/posts/${draft.postId}`);

          //Update existing post
          const success = await updatePost(title, tags, text, image, data._id);
          if (success) {
            deleteDraft();
          }
          setLoading(false);
        } catch (error) {
          updateMessage("That post does not exist.", "error");
          setLoading(false);
        }
        //No existing post, create a new post.
      } else {
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
          // setLoading(false);

          //Once a post has been successfully made, delete the draft.
          deleteDraft();
        } catch (error) {
          if (error.response.status === 400) {
            updateMessage(error.response.data.message, "error");
          } else if (error.response.status === 401) {
            updateMessage("Unauthorized to create posts.", "error");
          }
          setLoading(false);
        }
      }
    } else {
      updateMessage("Fields are not filled in.", "error");
    }
  };
  const deleteDraft = async () => {
    setLoading(true);

    let config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    try {
      await axios.delete(`/api/drafts/${id}`, config);
      setLoading(false);
    } catch (error) {
      updateMessage("Failed to delete draft", "error");
      setLoading(false);
    }
  };

  const updatePost = async (title, tags, text, image, id) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    setLoading(true);
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
      return true;
    } catch (error) {
      updateMessage(`Error editing post.`, "error");
      return false;
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

  return (
    <>
      {loading ? (
        <h1>Loading draft to edit...</h1>
      ) : !draft ? (
        <div className="grid md:grid-cols-2 place-items-center">
          <h1>Can't find the draft you want to edit.</h1>
        </div>
      ) : (
        <div className="grid place-items-center">
          <h1 className="mb-10 text-center">Edit Draft: {draft.title}</h1>
          <Form
            post={draft}
            btnTitle={"Publish Draft"}
            submitForm={publishDraft}
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
