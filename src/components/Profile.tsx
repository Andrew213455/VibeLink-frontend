import "./Profile.css";
import { profile, userAccessToken } from "../services/AuthCodePKCE";
import { useContext, useEffect, useState } from "react";
import ArtistsResponse from "../models/Artist";
import { getFollowedArtists } from "../services/spotifyApiService";
import AuthContext from "../Context/AuthContext";

const Profile = () => {
  const [followedArtists, setFollowedArtists] =
    useState<ArtistsResponse | null>(null);
  const { token } = useContext(AuthContext);
  // console.log(followedArtists);
  console.log(token);

  useEffect(() => {
    if (token) {
      getFollowedArtists(token).then((res) => {
        setFollowedArtists(res);
      });
    }
    console.log(followedArtists);
  }, [profile]);

  return (
    <div className="Profile">
      <div>
        {profile ? (
          <div>
            <p>
              <img
                className="userImage"
                src={profile?.images[0].url || ""}
                alt="profile"
              />

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
