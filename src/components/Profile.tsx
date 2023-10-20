import "./Profile.css";
import { getUsersPlaylist, profile } from "../services/AuthCodePKCE";
import { useContext, useEffect, useState } from "react";
import ArtistsResponse from "../models/Artist";
import { getFollowedArtists } from "../services/spotifyApiService";
import AuthContext from "../Context/AuthContext";
import { getToken } from "../services/spotifyApiService";
import { code, getAccessToken } from "../services/AuthCodePKCE";

import { PlayListResponse } from "../models/PlayList";

const Profile = () => {
  const [followedArtists, setFollowedArtists] =
    useState<ArtistsResponse | null>(null);
  const { token, setToken } = useContext(AuthContext);
  // console.log(followedArtists);
  const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [userToken, setUserToken] = useState("");
  const [userPlaylist, setUserPlaylist] = useState<PlayListResponse | null>(
    null
  );

  const logout = () => {
    setToken("");
  };
  useEffect(() => {
    if (code !== null) {
      getToken().then((res) => {
        setToken(res);
      });
    }
  }, []);

  useEffect(() => {
    if (code !== null) {
      getAccessToken(CLIENT_ID, code).then((res) => {
        setUserToken(res);
      });
      if (profile) {
        getUsersPlaylist(token, profile.id).then((res) => {
          setUserPlaylist(res);
          console.log(res);
        });
      }
    }
  }, [token]);

  console.log(profile?.id);

  // useEffect(() => {
  //   if (token) {
  //     getFollowedArtists(token).then((res) => {
  //       setFollowedArtists(res);
  //     });
  //   }
  //   console.log(followedArtists);
  // }, [profile]);

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <div>
        {profile ? (
          <div className="profile-top">
            <div className="img-container">
              {profile.images[0] && (
                <img
                  className="userImage"
                  src={profile?.images[1].url || ""}
                  alt="profile"
                />
              )}
            </div>
            <div className="info-container">
              <p>Name: {profile?.display_name}</p>
              <p>Followers:{profile?.followers.total}</p>
              <p>Following:{}</p>
            </div>
          </div>
        ) : (
          <p>Please Sign In</p>
        )}
      </div>
      <h3>Playlists:</h3>
      <div className="playlist-container">
        {userPlaylist !== null &&
          userPlaylist?.items.map((playlist) => {
            return (
              <div className="playlist">
                {playlist.name !== null ? <p>{playlist.name}</p> : <div></div>}
                {playlist.images[0] && (
                  <img src={playlist.images[0].url} alt={playlist.name} />
                )}
              </div>
            );
          })}
      </div>
      <div className="top-music-box">
        <h3>Top artitsts/tracks</h3>
      </div>

      {token ? (
        <a className="login" onClick={logout}>
          Logout
        </a>
      ) : (
        <a
          className="login"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      )}
    </div>
  );
};

export default Profile;
