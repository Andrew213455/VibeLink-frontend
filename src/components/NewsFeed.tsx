import { FormEvent, useEffect, useState } from "react";
import "./NewsFeed.css";

import { profile } from "../services/AuthCodePKCE";
import Post from "../models/Post";
import { addPost, getAllPost } from "../services/newsFeedApiService";
import PostBox from "./PostBox";
import { useNavigate } from "react-router-dom";

const NewsFeed = () => {
  const Navigate = useNavigate();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getAllPost().then((res) => {
      setPosts(res);
    });
  }, []);

  return (
    <section className="NewsFeed">
      {/* <PostBox /> */}
      <h2>NewsFeed</h2>
      <div className="post-container">
        <button
          className="post-button"
          onClick={() => {
            Navigate("/post");
          }}
        >
          Create a Post
        </button>
      </div>
      <div className="newsfeed-box">
        {posts !== null &&
          posts.map((post) => {
            return (
              <div className="single-post">
                <p>{post.content}</p>
                <p>from {post.from.display_name}</p>
                <img src={post.from.images[0].url} alt="" />
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default NewsFeed;
