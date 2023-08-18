import axios from "axios";
import { UserProfile } from "../models/SpotifyUser";
import NewReleaseResponse from "../models/NewRelease";
import Recommended from "../models/Recommended";

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
};

export const getArtist = (id: string, token: string) => {
  return axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
      params: { id: id, include_groups: "artist" },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    });
};

let searchString: string[] = ["artist", "playlist", "track", "album"];

export const getFollowedArtists = (token: string) => {
  return axios
    .get(`https://api.spotify.com/v1/me/following`, {
      params: { type: "artist" },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    });
};

export const searchEverything = (
  search: string,
  token: string
): Promise<any> => {
  return axios
    .get("https://api.spotify.com/v1/search", {
      params: { q: search, type: searchString.join(",") },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getAlbumsById = async (
  id: string,
  token: string
): Promise<any> => {
  const res = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
    params: { id: id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAlbumTracks = async (
  id: string,
  token: string
): Promise<any> => {
  const res = await axios.get(
    `https://api.spotify.com/v1/albums/${id}/tracks`,
    {
      params: { id: id, limit: 50 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export const playTrack = async (token: string) => {
  return axios
    .put("https://api.spotify.com/v1/me/player/play", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getNewReleases = async (
  token: string
): Promise<NewReleaseResponse> => {
  return axios
    .get("https://api.spotify.com/v1/browse/new-releases", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 30,
        country: "US",
        offset: 5,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getRecommendations = async (
  token: string,
  artists: string,
  tracks: string
): Promise<Recommended[]> => {
  return axios
    .get("https://api.spotify.com/v1/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_artists: artists,
        seed_tracks: tracks,
      },
    })
    .then((res) => {
      return res.data;
    });
};
