import "./Search.css";

import { FormEvent, useContext, useEffect, useState } from "react";
import {
  getNewReleases,
  searchEverything,
} from "../services/spotifyApiService";

import AuthContext from "../Context/AuthContext";
import Everything from "../models/Everything";

import { TrackResponse } from "../models/Track";
import ArtistsResponse from "../models/Artist";
import { PlayListResponse } from "../models/PlayList";
import { useNavigate } from "react-router";
import AlbumResponse from "../models/Album";
import NewReleaseResponse from "../models/NewRelease";

const Search = () => {
  const [albums, setAlbums] = useState<AlbumResponse | null>(null);
  const [artist, setArtist] = useState<ArtistsResponse | null>(null);
  const [playlist, setPlaylist] = useState<PlayListResponse | null>(null);
  const [tracks, setTracks] = useState<TrackResponse | null>(null);
  const [search, setSearch] = useState("");
  const [everything, setEverything] = useState<Everything | null>(null);
  const [trigger, setTrigger] = useState(false);
  const { token, setArtistId, artistId } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [newReleases, setNewReleases] = useState<NewReleaseResponse | null>(
    null
  );

  useEffect(() => {
    if (token) {
      getNewReleases(token).then((res) => {
        setNewReleases(res);
      });
    }
  }, [token]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (token && search) {
      searchEverything(search, token).then((res) => {
        setEverything(res);
      });
    }
    setTrigger(true);
    setSearch("");
  };

  useEffect(() => {
    if (everything !== null) {
      setAlbums(everything.albums);
      setArtist(everything.artists);
      setTracks(everything.tracks);
      setPlaylist(everything.playlists);
    }
  }, [everything]);

  return (
    <div className="Search">
      <form className="search-bar-container" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="enter artist here"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="search-bar"
        ></input>
        <button>Submit</button>
      </form>
      {everything === null && (
        <div>
          <div className="new-release-box">
            {newReleases &&
              newReleases?.albums.items.map((release) => {
                return (
                  <div className="new-release">
                    <div className="slider">
                      <div className="wrapper">
                        <div className="record-wrapper">
                          <div className="record"></div>
                        </div>
                        <div className="record-case">
                          <div className="image">
                            {release.images.length > 0 && (
                              <img
                                key={Math.floor(Math.random() * 60)}
                                src={release.images[0].url}
                                alt={release.name}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="name">{release.name}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {artist && <h2>Artist</h2>}

      <div className={trigger ? "artist-container" : ""}>
        {artist?.items.map((artist, index) => {
          return (
            <div className="new-release">
              <div className="slider">
                <div className="wrapper">
                  <div className="record-wrapper">
                    <div className="record"></div>
                  </div>
                  <div className="record-case">
                    {artist.images.length > 0 && (
                      <img
                        className="image"
                        key={index}
                        src={artist.images[0].url}
                        alt=""
                        onClick={() => {
                          setArtistId(artist.id);
                          Navigate("/artist");
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="name">{artist.name}</div>
            </div>
          );
        })}
      </div>
      {albums && <h2>Albums</h2>}
      <div className={trigger ? "albums-container" : ""}>
        {albums?.items.map((album) => {
          return (
            <div className="new-release">
              <div className="slider">
                <div className="wrapper">
                  <div className="record-wrapper">
                    <div className="record"></div>
                  </div>
                  <div className="record-case">
                    {album.images.length > 0 && (
                      <img
                        className="image"
                        key={album.id}
                        src={album.images[0].url}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="name">{album.name}</div>
            </div>
          );
        })}
      </div>
      {tracks && <h2>Tracks</h2>}
      <div className={trigger ? "tracks-container" : ""}>
        {tracks?.items.map((track) => {
          return (
            // <div className="tracks">
            //   <div>
            //     {track.album.images.length > 0 && (
            //       <img
            //         className="tracks-image"
            //         key={track.id}
            //         src={track.album.images[0].url}
            //         alt=""
            //       />
            //     )}
            //   </div>
            //   <div className="track-name">{track.name}</div>
            // </div>
            <div className="new-release">
              <div className="slider">
                <div className="wrapper">
                  <div className="record-wrapper">
                    <div className="record"></div>
                  </div>
                  <div className="record-case">
                    {track.album.images.length > 0 && (
                      <img
                        className="image"
                        key={track.id}
                        src={track.album.images[0].url}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="name">
                <p>{track.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
