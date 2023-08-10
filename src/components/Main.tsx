import { useContext, useEffect, useState } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { getNewReleases } from "../services/spotifyApiService";

import NewReleaseResponse from "../models/NewRelease";
import AuthContext from "../Context/AuthContext";
import { code } from "../services/AuthCodePKCE";

const Main = () => {
  const Navigate = useNavigate();
  const [newReleases, setNewReleases] = useState<NewReleaseResponse | null>(
    null
  );
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      getNewReleases(token).then((res) => {
        setNewReleases(res);
      });
    }
  }, [token]);

  return (
    <div className="Main">
      <h1>VibeLink</h1>
      <h2>New Releases</h2>
      <div className="new-release-box">
        {/* {newReleases &&
          newReleases?.albums.items.map((release) => {
            return (
              // <div className="new-release">
                <img
                  key={Math.floor(Math.random() * 60)}
                  src={release.images[0].url}
                  alt={release.name}
                />
                <p>{release.name}</p>
              </div>
            );
          })} */}
        {newReleases &&
          newReleases?.albums.items.map((release) => {
            return (
              <div className="new-release">
                <div className="slider">
                  <div className="wrapper">
                    <div className="record-wrapper">
                      <div className="record"></div>
                    </div>
                    <div className="record-case">
                      <div className="image">
                        <img
                          key={Math.floor(Math.random() * 60)}
                          src={release.images[0].url}
                          alt={release.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p>{release.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Main;
