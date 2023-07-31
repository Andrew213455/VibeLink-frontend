import { useSearchParams } from "react-router-dom";
import "./Search.css";
import { queryHelpers } from "@testing-library/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { getAlbums, searchBar } from "../services/spotifyApiService";
import ArtistResponse, { Artists } from "../models/Artist";
import AuthContext from "../Context/AuthContext";

const Search = () => {
  const [albums, setAlbums] = useState();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState<ArtistResponse | null>(null);
  const { token } = useContext(AuthContext);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (token && search) {
      searchBar(search, "artist", token).then((res) => {
        setArtists(res);
        console.log(res);
      });
    }
    setSearch("");
  };
  // useEffect(() => {
  //   if (id && token) {
  //     getAlbums(id, token).then((res) => {
  //       setAlbums(res);
  //     });
  //   }
  //   console.log(id);
  // }, [id]);

  console.log(artists);
  return (
    <div className="Search">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="enter artist here"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        ></input>
        <button>Submit</button>
      </form>
      <h2>results</h2>
      {artists?.artists.items.map((artist) => {
        return (
          <div>
            {artist.images.length > 0 && (
              <img src={artist.images[1].url} alt={artist.name} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Search;
