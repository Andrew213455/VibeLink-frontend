import AlbumResponse from "./Album";
import ArtistsResponse from "./Artist";

interface Track {
  album: AlbumResponse[];
  artists: ArtistsResponse[];
  name: string;
  id: string;
}

interface Items {
  track: Track;
}

interface Images {
  url: string;
}

export default interface SinglePlaylist {
  id: string;
  name: string;
  images: Images[];
  tracks: Items[];
}
