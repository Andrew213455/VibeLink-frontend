import axios from "axios";
import Post from "../models/Post";

const baseURL = process.env.REACT_APP_API_URL || "";

export const addPost = (newPost: Post): Promise<Post> => {
  return axios.post(`${baseURL}/newsfeed`, newPost).then((res) => res.data);
};
