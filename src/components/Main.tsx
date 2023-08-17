import { useContext, useEffect, useState } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { getNewReleases } from "../services/spotifyApiService";

import NewReleaseResponse from "../models/NewRelease";
import AuthContext from "../Context/AuthContext";
import { code } from "../services/AuthCodePKCE";

const Main = () => {
  const Navigate = useNavigate();

  return (
    <div className="Main">
      <h1>VibeLink</h1>
    </div>
  );
};

export default Main;
