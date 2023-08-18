interface Images {
  url: string;
}

interface Album {
  id: string;
  images: Images[];
}

interface Artist {
  id: string;
  name: string;
}

interface Track {
  id: string;
  album: Album;
  artists: Artist;
}

export default interface Recommended {
  tracks: Track;
}
