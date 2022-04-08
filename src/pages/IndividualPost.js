import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import { useParams, useHistory, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useGlobalContext } from "../context";
import Loader from "../components/Loader";
import ReactMarkdown from "react-markdown";

export default function IndividualPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  const { isLoggedIn, loading, setLoading } = useGlobalContext();

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/posts/${id}`);
        setPost(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    loadPost();
  }, [id, setLoading]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      {/* Post Container */}
      {!post ? (
        <div className="text-center mt-10">
          <h1>No blog post found.</h1>
          <Link
            className="btn-primary block w-32 text-center my-5 mx-auto"
            to="/"
          >
            back to Home
          </Link>
        </div>
      ) : (
        <article className="grid place-items-center w-full max-w-3xl mx-auto relative">
          <h1 className="text-center mb-5">{post.title}</h1>
          <Moment
            className="text-gray-400 w-full text-center"
            format="MMM DD, YYYY"
            date={post.createdAt}
          />
          <ul className="flex text-gray-500 dark:text-purple-400 mb-5">
            {post.tags.map((tag, index) => {
              return (
                <li key={index} className="m-1">
                  #{tag}
                </li>
              );
            })}
          </ul>
          <div className="relative w-full h-0 pb-2/3 md:pb-9/16">
            <img
              className="absolute inset-0 w-full h-full object-cover border-2 shadow-md dark:border-white"
              src={post.image}
              alt={post.title}
            />
          </div>

          <div className="py-10 px-2 w-full">
            <ReactMarkdown className="react-markdown">
              {post.text}
            </ReactMarkdown>
          </div>

          {/* Edit button  */}
          {isLoggedIn && (
            <button
              className="absolute right-0 -top-16 rounded-icon hover:shadow-md"
              onClick={() => history.push(`/admin/edit-post/${post._id}`)}
            >
              <FiEdit className="text-2xl" />
            </button>
          )}
        </article>
      )}
    </div>
  );
}
