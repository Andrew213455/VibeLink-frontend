import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const Navigate = useNavigate();
  return (
    <div className="NavBar">
      <nav className="nav-container">
        <button onClick={() => Navigate(`/newsfeed`)}>NewsFeed</button>
        <button onClick={() => Navigate(`/search`)}>Search</button>
        <button onClick={() => Navigate(`/profile`)}>Profile</button>
        <button onClick={() => Navigate(`/`)}>Home</button>
      </nav>
    </div>
  );
};

export default NavBar;
