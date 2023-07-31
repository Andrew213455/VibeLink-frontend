import { FormEvent, useContext, useEffect, useState } from "react";
import "./Header.css";
import { getToken, searchBar } from "../services/spotifyApiService";
import { code, fetchProfile, getAccessToken } from "../services/AuthCodePKCE";
import { UserProfile } from "firebase/auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ArtistResponse from "../models/Artist";
import AuthContext from "../Context/AuthContext";

const Header = () => {
  const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const { token, setToken } = useContext(AuthContext);

  const [selectedType, setSelectedType] = useState([""]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="Header">
      <div className="header-top">
        <Link to={"/"}>
          <h1>Vibe Link</h1>
        </Link>
        <div className="header-button">
          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login to Spotify
            </a>
          )}
        </div>
      </div>
      <div className="header-bottom"></div>
    </div>
  );
};

export default Header;
