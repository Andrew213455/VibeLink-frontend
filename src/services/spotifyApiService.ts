import axios from "axios";
import { UserProfile } from "../models/SpotifyUser";

// let token = window.localStorage.getItem("token") || "";

export const searchArtist = (
  searchedArtist: string,
  selectedType: string,
  token: string
): Promise<any> => {
  return axios
    .get("https://api.spotify.com/v1/search", {
      params: { q: searchedArtist, type: selectedType },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getToken = (): Promise<string> => {
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: "0ede3eaa5796463393ab9c3fbe8ae90d",
        client_secret: "a680b23058e84a0c87d6ff9a409e61d9",
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    )
    .then((res) => {
      return res.data.access_token;
    });
};

// export const authorizeUser = (): Promise<any> => {
//   return axios
//     .get("https://accounts.spotify.com/authorize", {
//       params: {
//         client_id: "0ede3eaa5796463393ab9c3fbe8ae90d",
//         response_type: "code",
//         redirect_uri: "http://localhost:3000",
//       },
//     })
//     .then((res) => {
//       return res.data;
//     });
// };
