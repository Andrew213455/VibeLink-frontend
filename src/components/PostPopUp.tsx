import { FormEvent, useEffect, useState } from "react";
import "./PostPopUp.css";
import Post from "../models/Post";

import { profile } from "../services/AuthCodePKCE";
import { addPost } from "../services/newsFeedApiService";

const PostPopUp = () => {
  const [trigger, setTrigger] = useState(false);
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
    <div className="PostPopUp">
      <div className={trigger ? "on" : "off"}>
        <form className="form-box" onSubmit={submitHandler}>
          <textarea
            className="content"
            value={content}
            // onClick={() => setTrigger(!trigger)}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <div>
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

export default PostPopUp;
