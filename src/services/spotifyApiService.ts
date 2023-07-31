import axios from "axios";
import { UserProfile } from "../models/SpotifyUser";

// let token = window.localStorage.getItem("token") || "";

export const getAlbums = (id: string, token: string) => {
  return axios
    .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      params: { id: id, include_groups: "album" },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    });
  }

  let searchString: string[] = ["artist", "playlist", "track", "album"]

export const searchEverything = (
  search: string,
  token: string
): Promise<any> => {
  return axios
    .get("https://api.spotify.com/v1/search", {
      params: { q: search, type: searchString.join(",")},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getAlbumsById = async (
  id:string,
  token: string
): Promise<any> => {
  const res = await axios
    .get(`https://api.spotify.com/v1/albums/${id}`, {
      params: { id: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
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
