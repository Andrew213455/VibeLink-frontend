import AuthContext from "../Context/AuthContext";
import "./MediaPlayer.css";
import React, { useContext } from "react";

const MediaPlayer = () => {
  const { trackId } = useContext(AuthContext);

  return <div className="MediaPlayer">MediaPlayer works</div>;
};

export default MediaPlayer;
