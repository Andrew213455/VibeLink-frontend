import "./Profile.css";
import {
  getUsersPlaylist,
  profile,
  userAccessToken,
} from "../services/AuthCodePKCE";
import { useContext, useEffect, useState } from "react";
import ArtistsResponse from "../models/Artist";
import { getFollowedArtists } from "../services/spotifyApiService";
import AuthContext from "../Context/AuthContext";
import { getToken } from "../services/spotifyApiService";
import { code, fetchProfile, getAccessToken } from "../services/AuthCodePKCE";
import { UserProfile } from "../models/SpotifyUser";
import { PlayListResponse } from "../models/PlayList";

const Profile = () => {
  const [followedArtists, setFollowedArtists] =
    useState<ArtistsResponse | null>(null);
  const { token } = useContext(AuthContext);
  // console.log(followedArtists);
  const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [userToken, setUserToken] = useState("");
  const [profileToken, setProfileToken] = useState("");
  const [userPlaylist, setUserPlaylist] = useState<PlayListResponse | null>(
    null
  );

  const logout = () => {
    setProfileToken("");
    window.localStorage.removeItem("token");
  };
  useEffect(() => {
    if (code !== null) {
      getToken().then((res) => {
        setProfileToken(res);
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
              <p>Playlists:</p>
            </div>
          </div>
        ) : (
          <p>Please Sign In</p>
        )}
      </div>
      <div className="top-music-box">Top artitsts/tracks</div>

      {profileToken ? (
        <button className="login" onClick={logout}>
          Logout
        </button>
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
