import "./Profile.css";
import { profile, userAccessToken } from "../services/AuthCodePKCE";
import { useContext, useEffect, useState } from "react";
import ArtistsResponse from "../models/Artist";
import { getFollowedArtists } from "../services/spotifyApiService";
import AuthContext from "../Context/AuthContext";
import { getToken } from "../services/spotifyApiService";
import { code, fetchProfile, getAccessToken } from "../services/AuthCodePKCE";
import { UserProfile } from "../models/SpotifyUser";

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
    }
  }, [token]);
  console.log(profile);

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
      <div>
        {profileToken ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <a
            className="login"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        )}
        {profile ? (
          <div>
            <p>
              {profile.images[0] && (
                <img
                  className="userImage"
                  src={profile?.images[0].url || ""}
                  alt="profile"
                />
              )}

              {profile?.display_name}
            </p>
            <p>Followers:{profile?.followers.total}</p>
            <p>Following:{}</p>
            <p>Playlists:</p>
          </div>
        ) : (
          <p>Please Sign In</p>
        )}
      </div>
      <div>Top artitsts/tracks</div>
    </div>
  );
};

export default Profile;

// const CLIENT_ID = "0ede3eaa5796463393ab9c3fbe8ae90d";
// useEffect(() => {
//   (async () => {
//     if (!code) {
//       redirectToAuthCodeFlow(CLIENT_ID);
//     } else {
//       const accessToken = await getAccessToken(CLIENT_ID, code);
//       fetchProfile(accessToken).then((res) => {
//         setProfile(res);
//         console.log(res);
//         console.log(code);
//       });
//     }
//   })();
// }, []);
