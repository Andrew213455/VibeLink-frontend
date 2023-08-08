import { useEffect, useState } from "react";
import "./Main.css";
import { getToken } from "../services/spotifyApiService";
import { code, fetchProfile, getAccessToken } from "../services/AuthCodePKCE";
import { UserProfile } from "../models/SpotifyUser";

import Home from "./Home";
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";

const Main = () => {
  const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [userToken, setUserToken] = useState("");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<UserProfile>({
    country: "",
    display_name: "",
    email: "",
    explicit_content: {
      filter_enabled: false,
      filter_locked: false,
    },
    external_urls: { spotify: "" },
    followers: { href: "", total: 0 },
    href: "",
    id: "",
    images: [
      {
        url: "",
        height: 0,
        width: 0,
      },
    ],
    product: "",
    type: "",
    uri: "",
  });
  const Navigate = useNavigate();

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  useEffect(() => {
    if (code !== null) {
      getToken().then((res) => {
        setToken(res);
      });
      fetchProfile(code).then((res) => {
        setProfile(res);
      });
    }
  }, []);

  useEffect(() => {
    if (code !== null) {
      getAccessToken(CLIENT_ID, code).then((res) => {
        setUserToken(res);
      });
    }
  }, [token]);

  return (
    <div className="Main">
      <h1>VibeLink</h1>
      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a
          className="login"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      )}
      <h2>Welcome to our app!</h2>
      <p>feel free to give me money. venmo Andrew Woodring</p>
    </div>
  );
};

export default Main;
