interface Images {
  url: string;
}

interface Album {
  images: Images[];
}

interface Item {
  id: string;
  name: string;
  album: Album;
}

export interface TrackResponse {
  items: Item[];
}
