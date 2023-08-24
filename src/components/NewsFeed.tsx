import { FormEvent, useEffect, useState } from "react";
import "./NewsFeed.css";

import { profile } from "../services/AuthCodePKCE";
import Post from "../models/Post";
import { addPost } from "../services/newsFeedApiService";

const NewsFeed = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(content);
  }, [content]);

  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const newPost: Post = {
      from: profile!,
      content: content,
    };
    addPost(newPost).then((res) => {
      console.log(res);
      setContent("");
    });
  };
  return (
    <div className="NewsFeed">
      <div className="post-container">
        <form className="form-box" onSubmit={submitHandler}>
          <textarea
            className="content"
            value={content}
            // onClick={() => setTrigger(!trigger)}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            cols={40}
            rows={3}
          ></textarea>
          <div className="button-box">
            <button type="button">playlist</button>
            <button type="button">Track</button>
            <button type="button">Single album</button>
          </div>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
};

export default NewsFeed;
