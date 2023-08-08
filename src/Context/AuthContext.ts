import { User } from "firebase/auth";
import { createContext } from "react";

export interface AuthContextModel {
  user: User | null; // null when not logged in
  token: string;
  setToken: (token: string) => void;
  artistId: string;
  setArtistId: (artistId: string) => void;
}

const defaultValue: AuthContextModel = {
  user: null,
  token: "",
  setToken: () => {},
  artistId: "",
  setArtistId: () => {},
};

const AuthContext = createContext(defaultValue);
export default AuthContext;
