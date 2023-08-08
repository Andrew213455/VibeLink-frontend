import AuthContext from "../Context/AuthContext";
import AlbumResponse from "../models/Album";
import { getAlbumsById } from "../services/spotifyApiService";
import "./Artist.css";
import React, { useContext, useEffect, useState } from "react";

const Artist = () => {
  const [artistAlbums, setArtistAlbums] = useState<AlbumResponse | null>(null);
  const { artistId } = useContext(AuthContext);

  useEffect(() => {
    console.log(artistId);
  }, []);

  return <div className="Artist">Artist works</div>;
};

export default Artist;
