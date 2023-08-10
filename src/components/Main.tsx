import { useContext, useEffect, useState } from "react";
import "./Main.css";

import { UserProfile } from "../models/SpotifyUser";

import Home from "./Home";
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";
import { getNewReleases } from "../services/spotifyApiService";
import AuthContext from "../Context/AuthContext";

const Main = () => {
  const Navigate = useNavigate();
  const [newReleases, setNewReleases] = useState("");
  const { token } = useContext(AuthContext);
  console.log(token);

  useEffect(() => {
    if (token) {
      getNewReleases(token).then((res) => {
        console.log(res);
      });
    }
  }, []);

  return (
    <div className="Main">
      <h1>VibeLink</h1>
    </div>
  );
};

export default Main;
