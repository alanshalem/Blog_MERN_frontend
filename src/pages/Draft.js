import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import { useParams, useHistory, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useGlobalContext } from "../context";
import Loader from "../components/Loader";
import ReactMarkdown from "react-markdown";

export default function Draft() {
  const { userInfo } = useGlobalContext();
  const [draft, setDraft] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  const { isLoggedIn, loading, setLoading } = useGlobalContext();

  useEffect(() => {
    const loadDraft = async () => {
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
    loadDraft();
  }, [id, setLoading, userInfo.token]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      {/* Post Container */}
      {!draft ? (
        <div className="text-center mt-10">
          <h1>No draft found.</h1>
          <Link
            className="btn-primary block w-32 text-center my-5 mx-auto"
            to="/"
          >
            back to Home
          </Link>
        </div>
      ) : (
        <article className="grid place-items-center w-full max-w-3xl mx-auto relative">
          <span className="dark:text-gray-300">DRAFT</span>
          <h1 className="text-center mb-5">{draft.title}</h1>
          <Moment
            className="text-gray-400"
            format="MMM DD, YYYY"
            date={draft.createdAt}
          />
          <ul className="flex gap-2 text-gray-500 dark:text-purple-400 mb-5">
            {draft.tags.map((tag, index) => {
              return <li key={index}>#{tag}</li>;
            })}
          </ul>
          <div className="relative w-full h-0 pb-2/3 md:pb-9/16">
            <img
              className="absolute inset-0 w-full h-full object-cover border-2 shadow-md dark:border-white"
              src={draft.image}
              alt={draft.title}
            />
          </div>

          <div className="py-10 px-2 w-full">
            <ReactMarkdown className="react-markdown">
              {draft.text}
            </ReactMarkdown>
          </div>

          {/* Edit button  */}
          {isLoggedIn && (
            <button
              className="absolute right-0 -top-16 rounded-icon"
              onClick={() => history.push(`/admin/edit-draft/${draft._id}`)}
            >
              <FiEdit className="text-2xl" />
            </button>
          )}
        </article>
      )}
    </div>
  );
}
