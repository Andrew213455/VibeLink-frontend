import { FormEvent, useEffect, useState } from "react";
import "./Header.css";
import { getToken, searchBar } from "../services/spotifyApiService";
import { code, fetchProfile, getAccessToken } from "../services/AuthCodePKCE";
import { UserProfile } from "firebase/auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ArtistResponse from "../models/Artist";

const Header = () => {
  const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [artistResponse, setArtistResponse] = useState<ArtistResponse | null>(
    null
  );
  const [selectedType, setSelectedType] = useState([""]);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  useEffect(() => {
    if (code !== null) {
      getToken().then((res) => {
        setToken(res);
      });
    }
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?${new URLSearchParams({ search: search })}`);
    // console.log(search);
    searchBar(search, "artist", token).then((res) => {
      console.log(res);
      setArtistResponse(res);
    });

    setSearch("");
  };

  useEffect(() => {
    console.log(artistResponse);
    console.log(artistResponse?.artists.items[0].id);
  }, [artistResponse]);

  // console.log(token);
  return (
    <div className="Header">
      <div className="header-top">
        <Link to={"/"}>
          <h1>Vibe Link</h1>
        </Link>
        <div className="header-button">
          {token && code ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login to Spotify
            </a>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>
      <div className="header-bottom">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="enter artist here"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
