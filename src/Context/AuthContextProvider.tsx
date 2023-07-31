import { ReactNode, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import { getToken } from "../services/spotifyApiService";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // useEffect to only register once at start
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      getToken().then((res) => {
        setToken(res);
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
