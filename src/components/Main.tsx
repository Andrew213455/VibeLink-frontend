import { useEffect, useState } from "react";
import "./Main.css";
import { getToken } from "../services/spotifyApiService";
import { code, fetchProfile, getAccessToken } from "../services/AuthCodePKCE";
import { UserProfile } from "../models/SpotifyUser";

import Home from "./Home";
import { useSearchParams } from "react-router-dom";
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

  useEffect(() => {
    if (code !== null) {
      getToken().then((res) => {
        setToken(res);
      });
      fetchProfile(code).then((res) => {
        setProfile(res);
      });
    }
  }, [code]);

  // useEffect(() => {
  //   if (code !== null) {
  //     getAccessToken(CLIENT_ID, code).then((res) => {
  //       setUserToken(res);
  //     });
  //   }
  // }, [token]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  return <div className="Main">{query !== null ? <Search /> : <Home />}</div>;
};

export default Main;
