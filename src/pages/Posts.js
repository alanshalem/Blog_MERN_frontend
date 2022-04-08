import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { tagData } from "../data";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const location = useLocation();
  const [filterCategory, setFilterCategory] = useState(
    location.search.split("=")[1]
  );
  const { icon, description } =
    tagData.filter((tag) => tag.name === filterCategory)[0] ||
    tagData.find((tag) => tag.name === "all");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    // Load Posts
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (filterCategory && filterCategory !== "all") {
          params.append("filter_category", filterCategory);
        }

        let response = await axios.get(`/api/posts?${params}`);
        let data = response.data.posts;

        setPosts(data);
        setNextCursor(response.data.next_cursor);

        setLoading(false);
      } catch (error) {
        console.log("There was an error loading the posts.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filterCategory, location]);

  useEffect(() => {
    if (location.search) {
      let category = location.search.split("=")[1];
      setFilterCategory(category);
    } else {
      setFilterCategory("");
    }
  }, [location]);

  const handleLoadMore = () => {
    const fetchMorePosts = async (nextCursor) => {
      try {
        setLoadingMore(true);
        const params = new URLSearchParams();
        if (nextCursor) {
          params.append("next_cursor", nextCursor);
        }
        if (filterCategory && filterCategory !== "all") {
          params.append("filter_category", filterCategory);
        }

        const response = await axios.get(`/api/posts?${params}`);

        setPosts([...posts, ...response.data.posts]);
        setNextCursor(response.data.next_cursor);
        setLoadingMore(false);
      } catch (error) {
        console.log(error);
        setLoadingMore(false);
      }
    };
    fetchMorePosts(nextCursor);
  };

  return (
    <div>
      <div className="grid place-items-center py-12">
        <div className="rounded-icon">{icon}</div>
        <h1 className="text-purple-400 text-2xl font-bold dark:text-purple-400">
          # {filterCategory ? filterCategory : "all"}
        </h1>
        <p className="py-4 max-w-sm text-center">{description}</p>
      </div>
      {/* Main feed */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid place-items-center">
          {/* Posts */}
          <div className="px-5">
            {posts.length === 0 ? (
              <div className="text-center border-double border-purple-300 border-2 p-5 m-5 mb-20">
                <h2>No posts found with the category: {filterCategory}</h2>
                <p>Please check back another time.</p>
              </div>
            ) : (
              posts.map((post) => {
                return <Post key={post._id} {...post} />;
              })
            )}
          </div>

          <div className="grid place-items-center">
            {loadingMore ? (
              <h2>Loading...</h2>
            ) : (
              nextCursor && (
                <button
                  className="btn-primary px-2"
                  onClick={() => handleLoadMore()}
                >
                  Load more
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
