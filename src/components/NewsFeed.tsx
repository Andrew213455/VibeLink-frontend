import "./NewsFeed.css";
import PostPopUp from "./PostPopUp";

const NewsFeed = () => {
  return (
    <div className="NewsFeed">
      <div className="post-container">
        <PostPopUp />
      </div>
    </div>
  );
};

export default NewsFeed;
