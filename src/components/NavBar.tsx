import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { profile } from "../services/AuthCodePKCE";

const NavBar = () => {
  const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const Navigate = useNavigate();
  const Profile = profile;
  return (
    <div className="NavBar">
      <nav className="nav-container">
        <button onClick={() => Navigate(`/`)}>Home</button>
        <button onClick={() => Navigate(`/newsfeed`)}>NewsFeed</button>
        <button onClick={() => Navigate(`/search`)}>Search</button>
        {profile ? (
          <button onClick={() => Navigate(`/profile`)}>Profile</button>
        ) : (
          <a
            className="login"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login
          </a>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
