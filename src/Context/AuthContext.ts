import { User } from "firebase/auth";
import { createContext } from "react";

export interface AuthContextModel {
  user: User | null; // null when not logged in
  token: string;
  setToken: (token: string) => void;
  artistId: string;
  setArtistId: (artistId: string) => void;
  albumId: string;
  setAlbumId: (albumId: string) => void;
  trackId: string;
  setTrackId: (trackId: string) => void;
  playlistId: string;
  setPlaylistId: (playlistId: string) => void;
}

const defaultValue: AuthContextModel = {
  user: null,
  token: "",
  setToken: () => {},
  artistId: "",
  setArtistId: () => {},
  albumId: "",
  setAlbumId: () => {},
  trackId: "",
  setTrackId: () => {},
  playlistId: "",
  setPlaylistId: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
