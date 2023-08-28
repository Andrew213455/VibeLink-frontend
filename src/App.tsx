import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Home from "./components/Home";
import Search from "./components/Search";
import NewsFeed from "./components/NewsFeed";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Artist from "./components/Artist";
import Playlist from "./components/Playlist";
import MediaPlayer from "./components/MediaPlayer";
import Track from "./components/Track";
import PostBox from "./components/PostBox";

function App() {
  const CLIENT_ID = "+++++++++++++++++++++++++++++";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/me" element={<Home />} />
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/newsfeed" element={<NewsFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/mediaplayer" element={<MediaPlayer />} />
          <Route path="/track" element={<Track />} />
          <Route path="/post" element={<PostBox />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
