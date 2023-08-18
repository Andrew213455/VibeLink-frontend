interface Artists {
  id: string;
  name: string;
}

interface Images {
  url: string;
}

interface Item {
  id: string;
  name: string;
  images: Images[];
  release_date?: string;
  album_type: string;
  artists: Artists[];
}

interface Album {
  items: Item[];
}

export default interface NewReleaseResponse {
  albums: Album;
}
