
import "./Search.css";

import { FormEvent, useContext, useEffect, useState } from "react";
import {  searchEverything } from "../services/spotifyApiService";

import AuthContext from "../Context/AuthContext";
import Everything from "../models/Everything";


import PlayList from "../models/PlayList";

import { AlbumResponse } from "../models/Album";

import { TrackResponse } from "../models/Track";
import ArtistsResponse from "../models/Artist";

const Search = () => {
  const [albums, setAlbums] = useState<AlbumResponse | null>(null);
 const [artist, setArtist] = useState<ArtistsResponse | null>(null);
 const [playlist, setPlaylist] = useState<PlayList | null>(null);
 const [tracks, setTracks] = useState<TrackResponse | null>(null)
  const [search, setSearch] = useState("");
  const [everything, setEverything] = useState<Everything | null>(null);
  const { token } = useContext(AuthContext);
  

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (token && search) {
      searchEverything(search,token).then((res) => {
        setEverything(res);
     
      });

    }
    setSearch("");
  };
  // useEffect(() => {
  //   if (id && token) {
  //     getAlbums(id, token).then((res) => {
  //       setAlbums(res);
  //     });
  //   }
  //   console.log(id);
  // }, [id]);

  useEffect(() => {
    if (everything !== null) {
      setAlbums(everything.albums)
      setArtist(everything.artists)
      setTracks(everything.tracks)
      setPlaylist(everything.playlists)
    }
  }, [everything])
  
console.log(artist?.items);
console.log(albums?.items);
console.log(tracks?.items)



  return (
    <div className="Search">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="enter artist here"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
        <button>Submit</button>
      </form>
      <h2>results</h2>
      {/* <div>
        {artist?.items.map((artist) => {
          return <div>
        {artist.images.length > 0 && <img key={artist.id} src={artist.images[0].url} alt="" />}
          </div>
        })}
      </div>
      <div>
        {albums?.album.items.map((album) => {
          return <div>
        {album.images.length > 0 && <img key={album.id} src={album.images[0].url} alt="" />}
          </div>
        })}
      </div>
      <div>
        {tracks?.tracks.items.map((track) => {
          return <div>
        {track.album.image.length > 0 && <img key={track.id} src={track.album.image[0].url} alt="" />}
          </div>
        })}
      </div>
      <div>
      
      </div> */}
    </div>
  );
};

export default Search;
