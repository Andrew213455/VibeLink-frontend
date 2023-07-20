import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import {
  getCurrentUserProfile,
  getToken,
  searchArtist,
} from "../services/spotifyApiService";
import SpotifyUser from "../models/SpotifyUser";

const Main = () => {
  const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [artist, setArtist] = useState("");

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(search);
    searchArtist(search, "artist", token).then((res) => {
      console.log(res);
      setArtist(res.data);
    });

    setSearch("");
  };

  useEffect(() => {
    getToken().then((res) => {
      setToken(res);
    });
    getCurrentUserProfile(token).then((result) => {
      console.log(result);
    });
    // const fetchData = async () => {
    //   try {
    //     const { data } = await getCurrentUserProfile(token);
    //     setProfile(data);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };

    // fetchData();
  }, []);

  console.log(token);

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
  );
};

export default Main;
