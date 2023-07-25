export interface Item {
  id: string;
  name: string;
  type: string;
}

export interface Artists {
  items: Item[];
}

export default interface ArtistResponse {
  artists: Artists;
}
