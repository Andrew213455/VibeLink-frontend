import "./Search.css";

import { FormEvent, useContext, useEffect, useState } from "react";
import {
  getNewReleases,
  getRecommendations,
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
  const {
    token,
    setArtistId,
    artistId,
    setAlbumId,
    setPlaylistId,
    playlistId,
  } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [newReleases, setNewReleases] = useState<NewReleaseResponse | null>(
    null
  );

  useEffect(() => {
    if (token) {
      getNewReleases(token).then((res) => {
        setNewReleases(res);
      });
      // getUsersTopArtist(token).then((res) => {
      //   console.log(res);
      // });
      //   getRecommendations(
      //     token,
      //     "4NHQUGzhtTLFvgF5SZesLK",
      //     "0c6xIDDpzE81m2q797ordA"
      //   ).then((res) => {
      //     console.log(res);
      //   });
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

  console.log(everything);

  return (
    <div className="Search">
      <h2 className="title-top">Search</h2>
      <div className={everything === null ? "search-before" : "search-after"}>
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
        {everything === null && <h2>New Releases</h2>}
        {everything === null && (
          <div className="new-release-box">
            <h2 className="rotate">tracks</h2>
            {newReleases &&
              newReleases?.albums.items.map((release) => {
                return (
                  release.album_type === "single" && (
                    <div
                      className="new-release"
                      onClick={() => {
                        Navigate("/mediaplayer");
                      }}
                    >
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
                      <p className="name">{release.artists[0].name}</p>
                      <p className="name">{release.name}</p>
                    </div>
                  )
                );
              })}
          </div>
        )}
        {everything === null && (
          <div className="new-release-box">
            <h2 className="rotate-after">albums</h2>
            {newReleases &&
              newReleases?.albums.items.map((release) => {
                return (
                  release.album_type === "album" && (
                    <div
                      className="new-release"
                      onClick={() => {
                        Navigate("/track");
                        setAlbumId(release.id);
                      }}
                    >
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
                      <p className="name">{release.artists[0].name}</p>
                      <p className="name">{release.name}</p>
                    </div>
                  )
                );
              })}
          </div>
        )}

        {/* {artist && } */}

        <div className={trigger ? "artist-container" : ""}>
          {artist && <h2 className="rotate-after">Artist</h2>}
          {artist?.items.map((artist, index) => {
            return (
              <div className="new-release ">
                {artist.images.length > 0 && (
                  <img
                    className="artist-image"
                    key={index}
                    src={artist.images[0].url}
                    alt=""
                    onClick={() => {
                      setArtistId(artist.id);
                      Navigate("/artist");
                    }}
                  />
                )}
                <p className="name">{artist.name}</p>
              </div>
            );
          })}
        </div>

        <div className={trigger ? "albums-container" : ""}>
          {albums && <h2 className="rotate-after">Albums</h2>}
          {albums?.items.map((album) => {
            return (
              <div
                className="new-release"
                onClick={() => {
                  Navigate("/track");
                  setAlbumId(album.id);
                }}
              >
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

        <div className={trigger ? "tracks-container" : ""}>
          {tracks && <h2 className="rotate-after">Tracks</h2>}
          {tracks?.items.map((track) => {
            return (
              <div
                className="new-release"
                onClick={() => {
                  Navigate("/mediaplayer");
                }}
              >
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
        <div className={trigger ? "tracks-container" : ""}>
          {playlist && <h2 className="rotate-after">Playlist</h2>}
          {playlist?.items.map((playlist) => {
            return (
              <div
                className="new-release"
                onClick={() => {
                  Navigate("/playlist");
                  setPlaylistId(playlist.id);
                }}
              >
                <div className="slider">
                  <div className="wrapper">
                    <div className="record-wrapper">
                      <div className="record"></div>
                    </div>
                    <div className="record-case">
                      {playlist.images.length > 0 && (
                        <img
                          className="image"
                          key={playlist.id}
                          src={playlist.images[0].url}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="name">
                  <p>{playlist.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
