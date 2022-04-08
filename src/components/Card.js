import React from "react";
import { useHistory } from "react-router-dom";

export default function Card({ _id, title, text, image }) {
  const history = useHistory();
  const CARD_WORD_MAX = 120;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-1 lg:max-w-md mb-4">
      <div className="relative w-full h-0 pb-2/3 sm:pb-3/4 sm:self-center">
        <img
          className="absolute inset-0 object-cover h-full w-full"
          src={image}
          alt={title}
        />
      </div>

      {/* Card Content */}
      <div className="relative p-5 sm:pt-0 md:pt-5 pb-16 w-full h-full">
        <div className="grid gap-5">
          <h3>{title}</h3>
          <p className="mb-5">
            {text.split("\n")[0].length > CARD_WORD_MAX
              ? `${text.split("\n")[0].substring(0, CARD_WORD_MAX)}...`
              : text.split("\n")[0]}
          </p>
          <div className="absolute flex items-end left-5 bottom-0 h-16 w-full">
            <button
              className="inline-block btn-primary w-3/5"
              onClick={() => history.push(`/posts/${_id}`)}
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
