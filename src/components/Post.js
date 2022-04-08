import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

export default function Post({ _id, title, text, tags, image, createdAt }) {
  return (
    <article className="grid place-items-center pb-12 max-w-4xl mx-auto mb-5  shadow-md bg-gray-200 dark:bg-gray-600 p-4 rounded-lg">
      <div className="relative w-full h-0 pb-2/3 md:pb-9/16">
        <Link to={`/posts/${_id}`}>
          <img
            className="absolute inset-0 w-full h-full object-cover border-2 dark:border-white"
            src={image}
            alt={title}
          />
        </Link>
      </div>

      <h2 className="mt-5 mb-2 text-3xl text-center font-semibold">{title}</h2>
      <Moment
        className="text-gray-400 w-full text-center"
        format="MMM DD, YYYY"
        date={createdAt}
      />
      <ul className="flex text-gray-500 dark:text-purple-400">
        {tags.map((tag, index) => {
          return (
            <li key={index} className="m-2">
              #{tag}
            </li>
          );
        })}
      </ul>

      <div className="p-5 w-full">
        {<ReactMarkdown className="react-markdown">{text}</ReactMarkdown>}
      </div>
    </article>
  );
}
