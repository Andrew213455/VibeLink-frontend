import { useEffect, useState } from "react";
import "./Profile.css";
import {
  code,
  fetchProfile,
  getAccessToken,
  getProfile,
  profile,
  redirectToAuthCodeFlow,
} from "../services/AuthCodePKCE";
import { UserProfile } from "firebase/auth";

const Profile = () => {
  // const [profile, setProfile] = useState<any>(undefined);

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
  console.log(profile);
  return <div className="Profile">Profile works</div>;
};

export default Profile;
