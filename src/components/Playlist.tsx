import AuthContext from "../Context/AuthContext";
import { PlayListResponse } from "../models/PlayList";
import SinglePlaylist from "../models/SinglePlaylist";
import { getPlaylist } from "../services/spotifyApiService";
import "./Playlist.css";
import React, { useContext, useEffect, useState } from "react";

const Playlist = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState<SinglePlaylist | null>(
    null
  );
  const { playlistId, token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      getPlaylist(playlistId, token).then((res) => {
        setCurrentPlaylist(res);
      });
    }
  }, [token]);

  return (
    <div className="Playlist">
      <h1>{currentPlaylist?.tracks[0].track[0].name}</h1>
    </div>
  );
};

export default Playlist;
