import "./Header.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { getAllAccounts } from "../services/accountApiService";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    getAllAccounts().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="Header">
      <h1>Vibe Link</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default Header;
