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
  //     7

  // I think you won't be able to achieve it in single API call in Spotify. However there's an alternative:

  // Request all albums of an artist (have a look here):

  // https://api.spotify.com/v1/artists/%7Bid%7D/albums
  // And then request the tracks of each album (have a look here):

  // https://api.spotify.com/v1/albums/%7Bid%7D/tracks
  // To avoid one request for each album, you can get multiple albums at once and when an album is requested, the tracks of such album will be returned in a paging object. You can pass the desired albums identifiers separated by , in the id query parameter to the following endpoint (have a look here):

  // https://api.spotify.com/v1/albums
};

export const searchBar = (
  search: string,
  selectedType: string,
  token: string
): Promise<any> => {
  return axios
    .get("https://api.spotify.com/v1/search", {
      params: { q: search, type: selectedType },
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
