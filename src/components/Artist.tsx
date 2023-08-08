import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import AlbumResponse from "../models/Album";
import ArtistsResponse from "../models/Artist";
import SingleArtist from "../models/SingleArtist";
import {
  getAlbums,
  getArtist,
  searchEverything,
} from "../services/spotifyApiService";
import "./Artist.css";
import React, { useContext, useEffect, useState } from "react";

const Artist = () => {
  const [albums, setAlbums] = useState<AlbumResponse | null>(null);
  const [artist, setArtist] = useState<SingleArtist | null>(null);
  const { artistId, token, setAlbumId } = useContext(AuthContext);
  const Navigate = useNavigate();

  useEffect(() => {
    getAlbums(artistId, token).then((res) => {
      setAlbums(res);
    });
    getArtist(artistId, token).then((res) => {
      setArtist(res);
    });
  }, [artistId]);

  return (
    <div className="Artist">
      <h2>{artist?.name}</h2>
      <div>
        {albums?.items.map((album) => {
          return (
            <div className="album-container">
              <p>{album.name}</p>
              <img
                className="album-image"
                src={album.images[0].url}
                alt={artist?.name}
                onClick={() => {
                  setAlbumId(album.id);
                  Navigate("/track");
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Artist;
