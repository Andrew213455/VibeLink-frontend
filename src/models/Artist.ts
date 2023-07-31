interface Images {
  url: string;
}

export interface Item {
  id: string;
  name: string;
  type: string;
  images: Images[];
}

export interface Artists {
  items: Item[];
}

export default interface ArtistResponse {
  artists: Artists;
}
