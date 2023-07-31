import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Home from "./components/Home";
import Search from "./components/Search";
import NewsFeed from "./components/NewsFeed";
import Profile from "./components/Profile";

function App() {
  const CLIENT_ID = "+++++++++++++++++++++++++++++";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/me" element={<Home />} />
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/newsfeed" element={<NewsFeed />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
