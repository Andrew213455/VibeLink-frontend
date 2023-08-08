import { useContext, useEffect, useState } from "react";
import "./Track.css";
import AuthContext from "../Context/AuthContext";
import {
  getAlbumTracks,
  getAlbums,
  getAlbumsById,
} from "../services/spotifyApiService";

import SingleAlbum from "../models/SingleAlbum";
import { TrackResponse } from "../models/Track";
import { useNavigate } from "react-router-dom";

const Track = () => {
  const [album, setAlbum] = useState<SingleAlbum | null>(null);
  const [tracks, setTracks] = useState<TrackResponse | null>(null);
  const { albumId, token, setTrackId } = useContext(AuthContext);
  const Navigate = useNavigate();

  useEffect(() => {
    getAlbumTracks(albumId, token).then((res) => {
      setTracks(res);
    });
    getAlbumsById(albumId, token).then((res) => {
      setAlbum(res);
    });
  }, []);
  return (
    <div className="Track">
      <h2>{album?.name}</h2>
      <div
        onClick={() => {
          Navigate("/mediaplayer");
        }}
      >
        {tracks?.items.map((track) => {
          return (
            <div
              onClick={() => {
                setTrackId(track.id);
              }}
            >
              {track.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Track;
