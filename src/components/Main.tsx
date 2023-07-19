import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import { currentUser } from "../services/spotifyApiService";
import SpotifyUser from "../models/SpotifyUser";

const Main = () => {
  const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  const [user, setUser] = useState<SpotifyUser>({
    display_name: "",
    id: "",
    images: { url: "", height: 0, width: 0 },
    // uri: string;
    followers: { href: "", total: 0 },
  });

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token") || "";

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))!
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
    currentUser().then((res) => {
      setUser(res);
      console.dir(res);
    });
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="Main">
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};

export default Main;
