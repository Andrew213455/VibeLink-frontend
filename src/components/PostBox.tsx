import { FormEvent, useEffect, useState } from "react";
import "./PostBox.css";
import { profile } from "../services/AuthCodePKCE";
import Post from "../models/Post";
import { addPost } from "../services/newsFeedApiService";
import { useNavigate } from "react-router-dom";

const PostBox = () => {
  const [content, setContent] = useState("");
  const Navigate = useNavigate();

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
      Navigate("/newsfeed");
    });
  };
  return (
    <div className="PostBox">
      <div className="post-container">
        <form className="form-box" onSubmit={submitHandler}>
          <textarea
            placeholder="What do you want to talk about?"
            className="content"
            value={content}
            // onClick={() => setTrigger(!trigger)}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <div>
            <button>Add a photo</button>
            <button>Add a playlist</button>
            <button>Add a track</button>
          </div>

          <button>Post</button>
          <button onClick={() => Navigate("/newsfeed")}>cancel</button>
        </form>
      </div>
    </div>
  );
};

export default PostBox;
