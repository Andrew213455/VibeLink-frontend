import axios from "axios";
import SpotifyUser from "../models/SpotifyUser";

export const currentUser = async (): Promise<any> => {
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token") || "";

  if (!token && hash) {
    token = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))!
      .split("=")[1];

    window.location.hash = "";
    window.localStorage.setItem("token", token);
  }

  await axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    });
};
